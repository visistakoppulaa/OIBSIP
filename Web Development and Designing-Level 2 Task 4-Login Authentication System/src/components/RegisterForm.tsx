import React, { useState } from 'react';
import { RegisterDTO } from '../types';
import { AuthMode } from '../lib/api';
import { validatePasswordRules, isValidEmail } from '../lib/cryptoUtils';
import { UserPlus, Mail, Lock, User as UserIcon, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (data: RegisterDTO) => Promise<void>;
  onSwitchToLogin: () => void;
  activeMode: AuthMode;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  onSwitchToLogin,
  activeMode,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const rules = validatePasswordRules(password);
  const passwordsMatch = password && confirmPassword ? password === confirmPassword : true;

  // Password Strength Score (0 to 100)
  const calculateStrength = () => {
    let score = 0;
    if (rules.minLength) score += 35;
    if (rules.hasNumber) score += 35;
    if (rules.hasUppercase) score += 15;
    if (rules.hasSpecial) score += 15;
    return score;
  };

  const strengthScore = calculateStrength();

  const getStrengthColor = () => {
    if (strengthScore < 40) return 'bg-rose-500';
    if (strengthScore < 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStrengthLabel = () => {
    if (strengthScore < 40) return 'Weak';
    if (strengthScore < 70) return 'Medium';
    return 'Strong Security';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Basic client-side pre-validations
    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!rules.minLength) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!rules.hasNumber) {
      setError('Password must contain at least 1 number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }

    setLoading(true);

    try {
      await onRegister({ username, email, password });
      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        
        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#312E81] text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <UserPlus className="w-6 h-6 text-indigo-100" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] tracking-tight">Create Account</h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Register via{' '}
            <span className="text-indigo-700 font-bold">
              {activeMode === 'express_bcrypt' ? 'Node Express + bcrypt' : 'Client Web Crypto (SHA-256)'}
            </span>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div id="register-error-alert" className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3 text-rose-800 text-xs font-mono animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block text-rose-900 uppercase">Registration Error</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div id="register-success-alert" className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 text-emerald-800 text-xs font-mono font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Field */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Username <span className="text-indigo-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                id="register-username-input"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. alexdev"
                className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-indigo-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="register-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex.dev@example.com"
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
                id="register-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 chars & 1 number"
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

            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div className="mt-2.5 space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Security Strength:</span>
                  <span className="font-bold text-indigo-700">{getStrengthLabel()}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                    style={{ width: `${strengthScore}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Password Requirement Checklist */}
            <div className="mt-3 p-3 bg-[#FAF9F5] rounded-xl border border-slate-200 space-y-1.5 text-xs font-mono">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Password Criteria Checklist:
              </div>
              <div className="flex items-center space-x-2">
                {rules.minLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className={rules.minLength ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                  Minimum 8 characters length
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {rules.hasNumber ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className={rules.hasNumber ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                  At least 1 numerical digit (0-9)
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirm Password <span className="text-indigo-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                id="register-confirm-password-input"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full bg-[#FAF9F5] border rounded-xl pl-10 pr-10 py-2.5 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
                  !passwordsMatch
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="text-xs font-mono text-rose-600 mt-1 flex items-center space-x-1">
                <span>Passwords do not match</span>
              </p>
            )}
          </div>

          {/* Submit Register Button */}
          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading || !passwordsMatch || !rules.minLength || !rules.hasNumber}
            className="w-full mt-3 bg-[#312E81] hover:bg-[#282568] disabled:opacity-50 text-white font-mono font-bold text-sm uppercase tracking-wider py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:cursor-not-allowed active:translate-y-0.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Hashing & Registering...</span>
              </>
            ) : (
              <>
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-slate-200 text-center font-mono">
          <p className="text-xs text-slate-600">
            Already registered?{' '}
            <button
              id="switch-to-login-btn"
              onClick={onSwitchToLogin}
              className="text-indigo-700 hover:underline font-bold ml-1 cursor-pointer"
            >
              Sign In Here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
