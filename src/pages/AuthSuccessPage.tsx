import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthSuccessPage() {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();
  const [message, setMessage] = useState('Completing Google sign-in...');

  useEffect(() => {
    const finishAuth = async () => {
      try {
        await refreshSession();
        setMessage('Google sign-in complete. Redirecting...');
        navigate('/dashboard', { replace: true });
      } catch {
        setMessage('Google sign-in completed, but the session could not be loaded.');
        navigate('/login', { replace: true });
      }
    };

    finishAuth();
  }, [navigate, refreshSession]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-5">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-4 text-secondary-900 dark:text-white">
          <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
          <h1 className="text-xl font-semibold">Signing you in</h1>
        </div>
        <p className="text-secondary-600 dark:text-secondary-400">{message}</p>
      </div>
    </div>
  );
}