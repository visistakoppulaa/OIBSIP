import React, { useState } from 'react';
import { LoginDTO } from '../types';
import { AuthMode } from '../lib/api';
import { LogIn, User, Lock, Eye, EyeOff, AlertCircle, Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onLogin: (data: LoginDTO) => Promise<void>;
  onSwitchToRegister: () => void;
  onSeedDemo: () => Promise<void>;
  activeMode: AuthMode;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSwitchToRegister,
  onSeedDemo,
  activeMode,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password) {
      setError('Please fill in both your username/email and password.');
      return;
    }

    setLoading(true);

    try {
      await onLogin({ identifier, password });
    } catch (err: any) {
      // Ensure error is displayed clearly without exposing which field was wrong
      setError(err.message || 'Invalid credentials. Please check your username/email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSeedAndFill = async (username: string, pass: string) => {
    setError(null);
    setSeeding(true);
    try {
      await onSeedDemo();
      setIdentifier(username);
      setPassword(pass);
    } catch (e) {
      // fallback filling
      setIdentifier(username);
      setPassword(pass);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#312E81] text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <LogIn className="w-6 h-6 text-indigo-100" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] tracking-tight">Account Sign In</h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Engine:{' '}
            <span className="text-indigo-700 font-bold">
              {activeMode === 'express_bcrypt' ? 'Node Express REST (bcrypt)' : 'LocalStorage Client (SHA-256)'}
            </span>
          </p>
        </div>

        {/* Generic Failure Alert */}
        {error && (
          <div id="login-error-alert" className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3 text-rose-800 text-xs font-mono animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block text-rose-900 uppercase">Authentication Failed</span>
              <span>{error}</span>
              <p className="text-[10px] text-rose-600 mt-1 italic">
                Notice: Specific field detail is obfuscated for security best practices.
              </p>
            </div>
          </div>
        )}

        {/* Quick Demo Pre-fill Seed Buttons */}
        <div className="mb-5 p-3.5 bg-[#FAF9F5] rounded-xl border border-[#E6E4DF] text-xs font-mono">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="font-bold text-slate-900 flex items-center space-x-1 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Test Accounts</span>
            </span>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded uppercase border border-indigo-200">One-Click</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              id="fill-demo-user-btn"
              type="button"
              disabled={seeding}
              onClick={() => handleQuickSeedAndFill('alexdev', 'Password123!')}
              className="px-3 py-2 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-800 text-left transition-all flex flex-col cursor-pointer"
            >
              <span className="font-bold text-indigo-900">alexdev</span>
              <span className="text-[10px] text-slate-500">Password123!</span>
            </button>
            <button
              id="fill-admin-user-btn"
              type="button"
              disabled={seeding}
              onClick={() => handleQuickSeedAndFill('admin_security', 'Password123!')}
              className="px-3 py-2 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-800 text-left transition-all flex flex-col cursor-pointer"
            >
              <span className="font-bold text-indigo-900">admin_security</span>
              <span className="text-[10px] text-slate-500">Password123!</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username / Email Field */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Username or Email <span className="text-indigo-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="login-identifier-input"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter username or email"
                className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password <span className="text-indigo-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-[#312E81] hover:bg-[#282568] text-white font-mono font-bold text-sm uppercase tracking-wider py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 active:translate-y-0.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-slate-200 text-center font-mono">
          <p className="text-xs text-slate-600">
            Don't have an account yet?{' '}
            <button
              id="switch-to-register-btn"
              onClick={onSwitchToRegister}
              className="text-indigo-700 hover:underline font-bold ml-1 cursor-pointer"
            >
              Register New Account
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
