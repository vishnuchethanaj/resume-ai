import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Resume, ExtractedResumeData, ATSScore, AnalysisReport } from '../types';

interface ResumeContextType {
  currentResume: Resume | null;
  resumes: Resume[];
  extractedData: ExtractedResumeData | null;
  atsScore: ATSScore | null;
  latestReport: AnalysisReport | null;
  isAnalyzing: boolean;
  uploadResume: (file: File) => Promise<void>;
  analyzeResume: () => Promise<void>;
  setCurrentResume: (resume: Resume | null) => void;
  deleteResume: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedResumeData | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [latestReport, setLatestReport] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const uploadResume = async (file: File) => {
    setIsAnalyzing(true);

    const API_URL = import.meta.env.VITE_API_URL || '';

    // Try server-side upload & parsing first
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(`${API_URL}/api/resumes`, {
        method: 'POST',
        body: form,
        credentials: 'include',
      });

      if (!res.ok) {
        let errorMessage = `Upload failed with status ${res.status}`;
        try {
          const errorBody = await res.json();
          errorMessage = errorBody?.error || errorBody?.message || errorMessage;
        } catch {
          try {
            const text = await res.text();
            if (text.trim()) errorMessage = text.trim();
          } catch {
            // Keep the status-based fallback message.
          }
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();
      const r = data.resume;

      const newResume: Resume = {
        id: r._id || r.id || Math.random().toString(36).substring(2, 15),
        userId: r.userId || '1',
        fileName: r.originalFileName || file.name,
        fileUrl: r.filePath || URL.createObjectURL(file),
        uploadedAt: new Date(r.createdAt || Date.now()),
        status: r.status || 'completed',
        lastAnalyzed: r.updatedAt ? new Date(r.updatedAt) : new Date(),
        atsScore: r.atsScore?.overall || undefined,
      };

      setResumes((prev) => [newResume, ...prev]);
      setCurrentResume(newResume);
      setExtractedData(r.extractedData || null);
      setAtsScore(r.atsScore || null);

      const report = r.atsScore
        ? ({ id: Math.random().toString(36).substring(2, 15), resumeId: newResume.id, atsScore: r.atsScore, suggestions: r.suggestions || [], createdAt: new Date() } as AnalysisReport)
        : null;

      if (report) setLatestReport(report);

      setIsAnalyzing(false);
      return;
    } catch (err) {
      // If server upload/parsing failed, surface error and do not fabricate data.
      console.error('Server upload or parsing failed', err);
      setIsAnalyzing(false);
      setExtractedData(null);
      setAtsScore(null);
      throw err;
    }
  };

  // NOTE: Client-side simulated analysis and mock data have been removed to avoid fabricated outputs.
  // All analysis must come from the server-side parser. If server parsing/upload fails, an error is thrown
  // and no fabricated data is produced.
  const analyzeResume = async () => {
    // Re-run analysis is handled server-side via upload endpoint. This client-side function is a no-op
    // to avoid generating fabricated data locally.
    return;
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (currentResume?.id === id) {
      setCurrentResume(null);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        resumes,
        extractedData,
        atsScore,
        latestReport,
        isAnalyzing,
        uploadResume,
        analyzeResume,
        setCurrentResume,
        deleteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
