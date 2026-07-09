import pdf from 'pdf-parse';
import fs from 'fs/promises';
import mammoth from 'mammoth';

// Regexes used only to detect explicitly-present tokens. We never fabricate values.
const emailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const phoneRe = /(?:\+?\d{1,3}[\s-]?)?(?:\(\d{2,4}\)[\s-]?|\d{2,4}[\s-])?\d{3,4}[\s-]?\d{3,4}/g;
const linkedinRe = /(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9_\-\/]+/gi;
const githubRe = /(https?:\/\/?)(www\.)?github\.com\/[A-Za-z0-9_\-\/]+/gi;
const urlRe = /(https?:\/\/[^\s]+)/gi;

// Extract raw text from PDF or DOCX (or text file). Return empty string on failure.
export async function extractTextFromFile(filePath, originalName) {
  const lower = originalName.toLowerCase();
  try {
    if (lower.endsWith('.pdf')) {
      // PDF parsing
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      const text = (data && data.text) ? data.text : '';
      return text || '';
    }
    if (lower.endsWith('.docx') || lower.endsWith('.doc')) {
      // DOCX parsing via mammoth
      const result = await mammoth.extractRawText({ path: filePath });
      const text = result.value || '';
      return text;
    }
    // fallback: read as utf-8 text
    const buf = await fs.readFile(filePath, { encoding: 'utf8' });
    return buf || '';
  } catch (err) {
    console.error('Text extraction failed for', originalName, err);
    return '';
  }
}

// Use a simple section parser to find headers (experience, education, skills, projects, certifications, languages, summary)
function findSectionLines(lines, headerRegex) {
  const idx = lines.findIndex((l) => headerRegex.test(l));
  if (idx === -1) return [];
  const out = [];
  for (let i = idx + 1; i < lines.length; i++) {
    if (/^(experience|education|skills|projects|certifications|languages|summary|objective|work experience)\b/i.test(lines[i])) break;
    if (lines[i].length === 0) continue;
    out.push(lines[i]);
    if (out.length > 50) break; // safety
  }
  return out;
}

// Validate that a string value appears in the raw text. If not, return null.
function validateStringInText(value, rawText) {
  if (!value) return null;
  const v = String(value).trim();
  if (!v) return null;
  return rawText.includes(v) ? v : null;
}

// Basic deterministic organizer used when AI is unavailable or to validate AI output.
export function deterministicOrganizer(rawText) {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const emails = (rawText.match(emailRe) || []).map((s) => s.trim());
  const phones = (rawText.match(phoneRe) || []).map((s) => s.trim());
  const linkedins = (rawText.match(linkedinRe) || []).map((s) => s.trim());
  const gitHub = (rawText.match(githubRe) || []).map((s) => s.trim());
  const urls = (rawText.match(urlRe) || []).map((s) => s.trim()).filter(u => !linkedins.includes(u) && !gitHub.includes(u));

  const summaryLines = findSectionLines(lines, /^(summary|objective)\b/i);
  const skillsLines = findSectionLines(lines, /^(skills|technical skills)\b/i);
  const eduLines = findSectionLines(lines, /^(education)\b/i);
  const expLines = findSectionLines(lines, /^(experience|work experience)\b/i);
  const projectLines = findSectionLines(lines, /^(projects?)\b/i);
  const certLines = findSectionLines(lines, /^(certifications?)\b/i);
  const langLines = findSectionLines(lines, /^(languages?)\b/i);

  // We do not invent a `name` here. If the first non-empty line looks like a name (2 words, letters only, capitalized), keep, otherwise null.
  let name = null;
  if (lines.length > 0) {
    const first = lines[0];
    if (/^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(first)) {
      name = first;
      if (!rawText.includes(name)) name = null;
    }
  }

  return {
    name: name || null,
    email: emails.length ? emails[0] : null,
    phone: phones.length ? phones[0] : null,
    address: null,
    linkedin: linkedins.length ? linkedins[0] : null,
    github: gitHub.length ? gitHub[0] : null,
    portfolio: urls.length ? urls[0] : null,
    education: eduLines.length ? eduLines : [],
    experience: expLines.length ? expLines : [],
    projects: projectLines.length ? projectLines : [],
    skills: skillsLines.length ? skillsLines : [],
    certifications: certLines.length ? certLines : [],
    languages: langLines.length ? langLines : [],
    summary: summaryLines.length ? summaryLines.join(' ') : null,
    rawText,
  };
}

// Call LLM to convert raw resume text into strict JSON. The model is instructed not to invent.
export async function organizeWithAI(rawText) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null; // AI not configured; caller should fall back to deterministic organizer

  // System prompt enforces strict JSON-only output and no fabrication.
  const systemPrompt = `You are a strict resume JSON extractor. You will receive raw resume text and must return ONLY valid JSON with the following keys: name, email, phone, address, linkedin, github, portfolio, education, experience, projects, skills, certifications, languages, summary. Use null for missing single fields and empty arrays for missing list fields. Do NOT invent or guess any information. If a value does not explicitly appear in the text, it must be null or an empty array. Output must be valid JSON and nothing else.`;

  const userPrompt = `RAW_RESUME_TEXT_START\n${rawText}\nRAW_RESUME_TEXT_END\n\nReturn the JSON object now.`;

  console.log('AI request sent');
  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0,
        max_tokens: 1500,
      }),
    });

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    console.log('AI response received');
    if (!content) return null;
    // The model should return strict JSON; parse safely
    try {
      const parsed = JSON.parse(content);
      return parsed;
    } catch (e) {
      // If model wraps JSON in code fences or extra text, try to extract JSON substring
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]); } catch (ee) { return null; }
      }
      return null;
    }
  } catch (err) {
    console.error('AI call failed', err);
    return null;
  }
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeString(value) {
  return value && typeof value === 'string' ? value.trim() : null;
}

function validateStringValue(value, rawText) {
  const normalized = normalizeString(value);
  if (!normalized) return null;
  return rawText.includes(normalized) ? normalized : null;
}

function validateArrayValues(values, rawText) {
  return safeArray(values)
    .map((item) => normalizeString(item))
    .filter((item) => item && rawText.includes(item));
}

function mapToSimpleArray(items, rawText) {
  return safeArray(items)
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object') return normalizeString(item.name) || normalizeString(item.title) || normalizeString(item.institution) || null;
      return null;
    })
    .filter((item) => item && rawText.includes(item));
}

export function mapStrictResumeToUiModel(strictJson) {
  const rawText = typeof strictJson.rawText === 'string' ? strictJson.rawText : '';

  const personalInfo = {
    name: validateStringValue(strictJson.name, rawText),
    email: validateStringValue(strictJson.email, rawText),
    phone: validateStringValue(strictJson.phone, rawText),
    linkedin: validateStringValue(strictJson.linkedin, rawText),
    github: validateStringValue(strictJson.github, rawText),
    portfolio: validateStringValue(strictJson.portfolio, rawText),
    address: validateStringValue(strictJson.address, rawText),
  };

  return {
    personalInfo,
    summary: validateStringValue(strictJson.summary, rawText),
    education: mapToSimpleArray(strictJson.education, rawText).map((item, index) => ({
      id: String(index + 1),
      institution: item,
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: undefined,
      description: '',
    })),
    experience: safeArray(strictJson.experience)
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') return item.company || item.title || item.description || null;
        return null;
      })
      .filter((item) => item && rawText.includes(item))
      .map((item, index) => ({
        id: String(index + 1),
        company: item,
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [item],
        technologies: [],
      })),
    projects: mapToSimpleArray(strictJson.projects, rawText).map((item, index) => ({
      id: String(index + 1),
      name: item,
      description: '',
      technologies: [],
      url: '',
      github: '',
      complexity: 'medium',
      impactScore: 50,
    })),
    skills: mapToSimpleArray(strictJson.skills, rawText).map((item) => ({
      name: item,
      category: 'programming',
      level: 'intermediate',
    })),
    certificates: mapToSimpleArray(strictJson.certifications, rawText).map((item) => ({
      name: item,
      issuer: '',
      date: '',
      expiryDate: undefined,
      credentialId: '',
      url: '',
    })),
    languages: mapToSimpleArray(strictJson.languages, rawText).map((item) => ({
      name: item,
      proficiency: 'proficient',
    })),
    achievements: [],
    rawText: strictJson.rawText || '',
  };
}

// Simple ATS score generator based solely on presence counts — deterministic and non-fabricating.
export function generateAtsFromExtractedStructured(struct) {
  if (!struct) return { overall: 0, breakdown: {} };
  const skillsCount = Array.isArray(struct.skills) ? struct.skills.length : 0;
  const expCount = Array.isArray(struct.experience) ? struct.experience.length : 0;
  const eduCount = Array.isArray(struct.education) ? struct.education.length : 0;

  const overall = Math.min(100, 20 + skillsCount * 5 + Math.min(20, expCount * 3) + Math.min(20, eduCount * 2));
  return {
    overall,
    breakdown: {
      skills: Math.min(100, skillsCount * 10),
      experience: Math.min(100, expCount * 10),
      education: Math.min(100, eduCount * 10),
    },
  };
}
