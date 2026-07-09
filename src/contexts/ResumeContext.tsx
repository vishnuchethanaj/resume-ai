import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Resume, ExtractedResumeData, ATSScore, AnalysisReport } from '../types';
import {
  mockResumeData,
  mockATSScore,
  mockSuggestions,
  mockResumes,
} from '../utils/mockData';

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
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);
  const [extractedData, setExtractedData] = useState<ExtractedResumeData | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [latestReport, setLatestReport] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const uploadResume = async (file: File) => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newResume: Resume = {
      id: Math.random().toString(36).substring(2, 15),
      userId: '1',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadedAt: new Date(),
      status: 'pending',
    };

    setResumes((prev) => [newResume, ...prev]);
    setCurrentResume(newResume);
    setIsAnalyzing(false);
  };

  const analyzeResume = async () => {
    if (!currentResume) return;

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setExtractedData(mockResumeData);
    setAtsScore(mockATSScore);

    const report: AnalysisReport = {
      id: Math.random().toString(36).substring(2, 15),
      resumeId: currentResume.id,
      atsScore: mockATSScore,
      suggestions: mockSuggestions,
      createdAt: new Date(),
    };
    setLatestReport(report);

    setResumes((prev) =>
      prev.map((r) =>
        r.id === currentResume.id
          ? { ...r, status: 'completed', atsScore: mockATSScore.overall, lastAnalyzed: new Date() }
          : r
      )
    );

    setIsAnalyzing(false);
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
