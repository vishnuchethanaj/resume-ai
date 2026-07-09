Google OAuth + MongoDB auth server

Setup

1. Copy `.env.example` to `.env` and fill the values: `MONGO_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SESSION_SECRET`, `FRONTEND_URL`.
2. Install dependencies inside the `server` folder:

```bash
cd server
npm install
```

3. Run in development:

```bash
npm run dev
```

How it works

- `GET /auth/google` starts the Google OAuth flow.
- `GET /auth/google/callback` is the OAuth callback; on success it stores/loads the user in MongoDB and creates a session.
- `GET /api/auth/user` returns the currently logged-in user (session-backed).
- `POST /api/auth/logout` logs out the user.

Frontend integration

From the frontend, open a new window to `http://localhost:4000/auth/google` to start sign-in. After redirect it will send the user back to `FRONTEND_URL/auth-success` — handle that route to fetch `/api/auth/user` from the server (include credentials).

Resume upload API

- `POST /api/resumes` accepts a `multipart/form-data` request with `file` field (PDF). It will parse the PDF, extract basic fields (name, email, phone, skills, basic sections), generate a simple ATS score, save a `resume` document in MongoDB, and return the saved document.

Example `curl`:

```bash
curl -F "file=@/path/to/resume.pdf" http://localhost:4000/api/resumes
```

Example fetch from the frontend:

```js
const form = new FormData();
form.append('file', fileInput.files[0]);
const res = await fetch('http://localhost:4000/api/resumes', { method: 'POST', body: form, credentials: 'include' });
const data = await res.json();
console.log(data);
```

Notes

- This server stores user profiles in a `users` collection using Mongoose.
- Sessions are stored in MongoDB via `connect-mongo`.
- In production set `cookie.secure` to `true` and serve over HTTPS.
