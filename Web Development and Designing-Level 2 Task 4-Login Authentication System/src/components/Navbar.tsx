import React from 'react';
import { AuthSession } from '../types';
import { AuthMode } from '../lib/api';
import { Shield, BookOpen, Server, HardDrive, LogOut, User as UserIcon, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  session: AuthSession | null;
  activeMode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onOpenReadme: () => void;
  onLogout: () => void;
  activeTab: 'login' | 'register' | 'dashboard';
  setActiveTab: (tab: 'login' | 'register' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  activeMode,
  onModeChange,
  onOpenReadme,
  onLogout,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E6E4DF] text-[#1A1D20] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(session ? 'dashboard' : 'login')}>
          <div className="w-10 h-10 rounded-xl bg-[#312E81] text-white p-0.5 shadow-sm flex items-center justify-center font-extrabold">
            <Shield className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#0F172A]">
                AuthVault
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 tracking-wider uppercase">
                TASK 4
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider hidden sm:block">
              // Secure Session Architecture
            </p>
          </div>
        </div>

        {/* Tech Stack Engine Switcher & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Architecture Switcher */}
          <div className="hidden md:flex items-center bg-[#F1EFF7] p-1 rounded-full border border-[#E0DCED] text-[11px] font-mono">
            <button
              id="mode-express-btn"
              onClick={() => onModeChange('express_bcrypt')}
              className={`flex items-center space-x-1.5 px-3.5 py-1 rounded-full font-bold uppercase transition-all cursor-pointer ${
                activeMode === 'express_bcrypt'
                  ? 'bg-[#312E81] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Full-Stack Node.js + Express REST API with bcrypt hashing"
            >
              <Server className="w-3.5 h-3.5" />
              <span>Express (bcrypt)</span>
            </button>
            <button
              id="mode-local-btn"
              onClick={() => onModeChange('local_sha256')}
              className={`flex items-center space-x-1.5 px-3.5 py-1 rounded-full font-bold uppercase transition-all cursor-pointer ${
                activeMode === 'local_sha256'
                  ? 'bg-[#312E81] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Client-Side LocalStorage with Web Crypto SHA-256"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>LocalStorage (SHA-256)</span>
            </button>
          </div>

          {/* README Documentation Button */}
          <button
            id="open-readme-btn"
            onClick={onOpenReadme}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono uppercase font-bold tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full border border-slate-200 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Docs</span>
          </button>

          {/* Auth State / Profile / Navigation */}
          {session ? (
            <div className="flex items-center space-x-3 border-l border-[#E6E4DF] pl-3 sm:pl-4">
              <button
                id="nav-dashboard-btn"
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#312E81] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center text-[10px] font-bold border border-indigo-300">
                  {session.user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{session.user.username}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active Session"></span>
              </button>

              <button
                id="nav-logout-btn"
                onClick={onLogout}
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                title="Logout Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 border-l border-[#E6E4DF] pl-3">
              <button
                id="nav-login-btn"
                onClick={() => setActiveTab('login')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[#312E81] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Login
              </button>
              <button
                id="nav-register-btn"
                onClick={() => setActiveTab('register')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-[#312E81] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Register
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Mode Notice */}
      <div className="md:hidden bg-slate-50 px-4 py-1.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
        <span className="flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3 text-indigo-600" />
          <span>Engine: <strong className="text-slate-900">{activeMode === 'express_bcrypt' ? 'Express (bcrypt)' : 'LocalStorage (SHA-256)'}</strong></span>
        </span>
        <button
          onClick={() => onModeChange(activeMode === 'express_bcrypt' ? 'local_sha256' : 'express_bcrypt')}
          className="text-indigo-600 hover:underline font-bold uppercase"
        >
          Switch
        </button>
      </div>
    </header>
  );
};
