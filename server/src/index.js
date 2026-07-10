import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from './passportConfig.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import ResumeModel from './models/Resume.js';
import { extractTextFromFile, deterministicOrganizer, organizeWithAI, generateAtsFromExtractedStructured, mapStrictResumeToUiModel } from './utils/extractors.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const GOOGLE_AUTH_ENABLED = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

function resolveFrontendRedirect(req) {
  const stored = req.session?.oauthReturnTo;
  if (stored && typeof stored === 'string') return stored;
  return FRONTEND_URL;
}

if (!MONGO_URI) {
  console.error('MONGO_URI is required in environment');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_this',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/auth/google', (req, res, next) => {
  if (!GOOGLE_AUTH_ENABLED) {
    return res.status(503).json({ error: 'Google authentication is not configured on the server.' });
  }

  const requestOrigin = req.get('origin');
  if (requestOrigin) {
    req.session.oauthReturnTo = requestOrigin;
  } else {
    req.session.oauthReturnTo = FRONTEND_URL;
  }

  return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get(
  '/auth/google/callback',
  (req, res, next) => {
    if (!GOOGLE_AUTH_ENABLED) {
      return res.redirect(`${resolveFrontendRedirect(req)}/login?auth=google-unavailable`);
    }

    return passport.authenticate('google', { session: true }, (err, user) => {
      if (err || !user) {
        return res.redirect(`${resolveFrontendRedirect(req)}/login?auth=google-failed`);
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.redirect(`${resolveFrontendRedirect(req)}/login?auth=google-failed`);
        }

        const redirectBase = resolveFrontendRedirect(req);
        delete req.session.oauthReturnTo;
        return res.redirect(`${redirectBase}/auth-success`);
      });
    })(req, res, next);
  },
  (req, res) => res.redirect(`${resolveFrontendRedirect(req)}/auth-success`)
);

app.get('/api/auth/user', (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: req.user });
});

app.post('/api/auth/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  });
});

app.get('/', (req, res) => {
  res.json({ ok: true });
});

// File upload setup
const uploadDir = path.join(process.cwd(), 'uploads');
await fs.mkdir(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});
const upload = multer({ storage });

app.post('/api/resumes', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const filePath = req.file.path;
  try {
console.log('PDF uploaded:', req.file.originalname);

    // Extract raw text from the uploaded file (PDF/DOCX/text)
    const rawText = await extractTextFromFile(filePath, req.file.originalname);
    if (!rawText || rawText.trim().length === 0) {
      console.error('Unable to extract text from the uploaded resume.');
      return res.status(500).json({ error: 'Unable to extract text from the uploaded resume.' });
    }
    console.log('Text extracted successfully');
    console.log('Extracted raw text (first 200 chars):', rawText.slice(0, 200).replace(/\n/g, ' '));

    // Attempt to organize with AI when available. AI must not invent data; if AI is not configured or fails, fall back
    // to a deterministic organizer which extracts only explicitly-present tokens/sections.
    let structured = null;
    try {
      structured = await organizeWithAI(rawText);
    } catch (err) {
      console.error('AI organizer failed', err);
      structured = null;
    }

    if (!structured) {
      // Deterministic organization (no invention)
      structured = deterministicOrganizer(rawText);
    }

    const structuredUi = mapStrictResumeToUiModel({ ...structured, rawText });
    const ats = generateAtsFromExtractedStructured(structuredUi);

    const resumeDoc = await ResumeModel.create({
      userId: req.user?._id || 'anonymous',
      originalFileName: req.file.originalname,
      filePath,
      extractedData: structuredUi,
      atsScore: ats,
      status: 'completed',
      rawText,
    });

    res.json({ resume: resumeDoc });
  } catch (err) {
    console.error('Resume processing error', err);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
