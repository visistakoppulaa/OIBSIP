import React, { useState, useEffect } from 'react';
import { AuthSession, LoginDTO, RegisterDTO } from './types';
import {
  apiLogin,
  apiRegister,
  apiLogout,
  apiGetMe,
  apiSeedDemoAccounts,
  getActiveAuthMode,
  setActiveAuthMode,
  AuthMode,
} from './lib/api';
import { Navbar } from './components/Navbar';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ProtectedDashboard } from './components/ProtectedDashboard';
import { ReadmeViewer } from './components/ReadmeViewer';
import { SecurityMetrics } from './components/SecurityMetrics';
import { Shield, CheckCircle2, Info, AlertTriangle, Sparkles } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeMode, setActiveMode] = useState<AuthMode>(getActiveAuthMode());
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'dashboard'>('login');
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  // Check initial session & seed demo data
  useEffect(() => {
    async function init() {
      try {
        await apiSeedDemoAccounts();
        const current = await apiGetMe();
        if (current) {
          setSession(current);
          setActiveTab('dashboard');
        } else {
          setSession(null);
          setActiveTab('login');
        }
      } catch (e) {
        console.warn('Initialization error:', e);
      } finally {
        setInitializing(false);
      }
    }
    init();
  }, [activeMode]);

  const handleModeChange = (newMode: AuthMode) => {
    setActiveAuthMode(newMode);
    setActiveMode(newMode);
    showToast(
      `Switched Auth Engine to ${newMode === 'express_bcrypt' ? 'Express Backend (bcrypt)' : 'Client LocalStorage (SHA-256)'}`,
      'info'
    );
  };

  const handleLogin = async (data: LoginDTO) => {
    const newSession = await apiLogin(data, activeMode);
    setSession(newSession);
    setActiveTab('dashboard');
    showToast(`Welcome back, ${newSession.user.username}! Direct session established.`, 'success');
  };

  const handleRegister = async (data: RegisterDTO) => {
    await apiRegister(data, activeMode);
    showToast('Registration successful! Please log in with your credentials.', 'success');
  };

  const handleLogout = async () => {
    await apiLogout();
    setSession(null);
    setActiveTab('login');
    showToast('You have been logged out. Active session cleared.', 'info');
  };

  // Route protection guard for dashboard tab
  const handleTabChange = (tab: 'login' | 'register' | 'dashboard') => {
    if (tab === 'dashboard' && !session) {
      showToast('Access Denied: Protected page requires an active session.', 'error');
      setActiveTab('login');
      return;
    }
    setActiveTab(tab);
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center space-y-4 font-mono">
        <div className="w-12 h-12 border-4 border-[#2A2A2A] border-t-[#C1FF72] rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-400">Initializing Auth System & Verification Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E0E0E0] font-sans selection:bg-[#C1FF72] selection:text-black flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        session={session}
        activeMode={activeMode}
        onModeChange={handleModeChange}
        onOpenReadme={() => setIsReadmeOpen(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Security Overview Metrics Badges */}
        <SecurityMetrics session={session} activeMode={activeMode} />

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center space-x-3 text-xs font-mono font-bold shadow-[4px_4px_0px_#000] transition-all ${
            toastMessage.type === 'success'
              ? 'bg-[#1A1A1A] border-[#C1FF72] text-[#C1FF72]'
              : toastMessage.type === 'error'
              ? 'bg-rose-950/80 border-rose-500 text-rose-300'
              : 'bg-[#1A1A1A] border-[#2A2A2A] text-slate-200'
          }`}>
            {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C1FF72] shrink-0" />}
            {toastMessage.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-5 h-5 text-[#C1FF72] shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Views Router */}
        {activeTab === 'dashboard' && session ? (
          <ProtectedDashboard session={session} onLogout={handleLogout} />
        ) : activeTab === 'register' ? (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setActiveTab('login')}
            activeMode={activeMode}
          />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveTab('register')}
            onSeedDemo={async () => {
              await apiSeedDemoAccounts();
              showToast('Demo accounts seeded! Click "alexdev" to auto-fill.', 'info');
            }}
            activeMode={activeMode}
          />
        )}

      </main>

      {/* Interactive README Documentation Viewer Modal */}
      <ReadmeViewer isOpen={isReadmeOpen} onClose={() => setIsReadmeOpen(false)} />

      {/* Minimal Footer */}
      <footer className="border-t border-[#1A1A1A] bg-[#0D0D0D] py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            TASK 4 · Login Authentication System — Built with React 19, Express, bcrypt, and Web Crypto.
          </p>
          <div className="flex items-center space-x-4 text-slate-400">
            <button
              onClick={() => setIsReadmeOpen(true)}
              className="hover:text-[#C1FF72] underline cursor-pointer"
            >
              View README Documentation
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
