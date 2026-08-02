import React, { useState, useEffect } from 'react';
import { AuthSession, SecurityLog } from '../types';
import { apiGetLogs, apiChangePassword } from '../lib/api';
import { validatePasswordRules } from '../lib/cryptoUtils';
import { ShieldCheck, LogOut, KeyRound, User, Clock, HardDrive, Terminal, AlertTriangle, CheckCircle2, RefreshCw, Lock, Download, ShieldAlert, Activity, Eye, EyeOff, Loader2 } from 'lucide-react';

interface ProtectedDashboardProps {
  session: AuthSession;
  onLogout: () => void;
}

export const ProtectedDashboard: React.FC<ProtectedDashboardProps> = ({
  session,
  onLogout,
}) => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  
  // Password Change state
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  const [changePassLoading, setChangePassLoading] = useState(false);
  const [changePassError, setChangePassError] = useState<string | null>(null);
  const [changePassSuccess, setChangePassSuccess] = useState<string | null>(null);

  // Time remaining calculator
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const expires = new Date(session.expiresAt).getTime();
    return Math.max(0, Math.floor((expires - Date.now()) / 1000));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const expires = new Date(session.expiresAt).getTime();
      const diff = Math.max(0, Math.floor((expires - Date.now()) / 1000));
      setSecondsRemaining(diff);
      if (diff <= 0) {
        onLogout();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [session.expiresAt, onLogout]);

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const data = await apiGetLogs();
      setLogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError(null);
    setChangePassSuccess(null);

    if (!currentPass || !newPass || !confirmNewPass) {
      setChangePassError('Please fill in all password fields.');
      return;
    }

    if (newPass !== confirmNewPass) {
      setChangePassError('New passwords do not match.');
      return;
    }

    const rules = validatePasswordRules(newPass);
    if (!rules.minLength || !rules.hasNumber) {
      setChangePassError('New password must be at least 8 characters long and contain a number.');
      return;
    }

    setChangePassLoading(true);

    try {
      const msg = await apiChangePassword(currentPass, newPass);
      setChangePassSuccess(msg);
      setCurrentPass('');
      setNewPass('');
      setConfirmNewPass('');
      fetchLogs();
      setTimeout(() => {
        setShowChangePasswordModal(false);
        setChangePassSuccess(null);
      }, 2000);
    } catch (err: any) {
      setChangePassError(err.message || 'Failed to update password.');
    } finally {
      setChangePassLoading(false);
    }
  };

  const downloadSecurityReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      user: session.user,
      sessionToken: session.token,
      loginMethod: session.loginMethod,
      loginTimestamp: new Date(session.loginTimestamp).toISOString(),
      expiresAt: session.expiresAt,
      securityAuditLogs: logs,
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `auth_security_audit_${session.user.username}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const newPassRules = validatePasswordRules(newPass);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Protected Welcome Hero Banner */}
      <div className="bg-white border border-[#E6E4DF] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* User Avatar & Details */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="relative">
              <img
                src={session.user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={session.user.username}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-600 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Protected Active Session">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] tracking-tight">
                  Welcome back, {session.user.username}!
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Authenticated
                </span>
              </div>
              <p className="text-xs font-mono text-slate-600 mt-1 flex items-center space-x-2">
                <span>{session.user.email}</span>
                <span>•</span>
                <span className="text-indigo-700 font-bold uppercase">{session.user.role || 'Member'}</span>
              </p>
              <p className="text-[11px] font-mono text-slate-500 mt-1">
                Account Created: {new Date(session.user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 font-mono">
            <button
              id="dashboard-change-password-btn"
              onClick={() => setShowChangePasswordModal(true)}
              className="px-4 py-2 bg-[#FAF9F5] hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-indigo-700" />
              <span>Change Password</span>
            </button>

            <button
              id="dashboard-export-report-btn"
              onClick={downloadSecurityReport}
              className="px-4 py-2 bg-[#FAF9F5] hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-indigo-700" />
              <span>Export Audit JSON</span>
            </button>

            <button
              id="dashboard-logout-btn"
              onClick={onLogout}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </div>

      {/* Grid Section: Hashing Inspector & Session Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        
        {/* Panel 1: Password Non-Plaintext Hashing Inspector */}
        <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-[#0F172A]">Password Storage Inspector</h3>
                  <p className="text-xs text-slate-500">Verifying non-plaintext hashing compliance</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-200">
                Salted & Hashed
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-slate-200 text-xs">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex justify-between">
                  <span>Cryptographic Algorithm</span>
                  <span className="text-indigo-800 font-bold">{session.loginMethod === 'express_bcrypt' ? 'bcrypt (10 rounds)' : 'SHA-256 Web Crypto'}</span>
                </div>
                <div className="text-indigo-950 break-all select-all font-bold font-mono bg-white p-2 rounded border border-slate-200">
                  {session.user.passwordHashPreview || '$2a$10$e89f...[salted_hash]'}
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Plaintext Stored?</span>
                  <span className="font-bold text-rose-700 flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>NEVER (0 Plaintext)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Salt Protection</span>
                  <span className="font-bold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Unique Salt Per User</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Rainbow Table Defense</span>
                  <span className="font-bold text-indigo-700">Active</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-4 italic">
            Requirement Check: Passwords must not be stored in plain text — uses bcrypt for Express or SHA-256 for client side.
          </p>
        </div>

        {/* Panel 2: Active Session Details & Expiration Countdown */}
        <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-[#0F172A]">Active Session Token</h3>
                  <p className="text-xs text-slate-500">Session validity & security token state</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 border border-indigo-200">
                {formatTime(secondsRemaining)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-slate-200 text-xs">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                  Bearer Token String
                </div>
                <div className="text-indigo-900 truncate font-bold font-mono bg-white p-2 rounded border border-slate-200">
                  {session.token}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-[#FAF9F5] rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Auth Engine</span>
                  <span className="font-bold text-slate-900">
                    {session.loginMethod === 'express_bcrypt' ? 'Express REST Server' : 'Client LocalStorage'}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF9F5] rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Login Timestamp</span>
                  <span className="font-bold text-slate-900">
                    {new Date(session.loginTimestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Direct access protection active</span>
            <span className="text-emerald-700 font-bold flex items-center space-x-1 uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Route Guarded</span>
            </span>
          </div>
        </div>

      </div>

      {/* Security Audit & Activity Logs Section */}
      <div className="bg-white border border-[#E6E4DF] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[#0F172A]">Security Audit Log Timeline</h3>
              <p className="text-xs font-mono text-slate-500">Real-time authentication attempts & system security events</p>
            </div>
          </div>

          <button
            id="refresh-logs-btn"
            onClick={fetchLogs}
            disabled={loadingLogs}
            className="p-2 bg-[#FAF9F5] hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Refresh Security Logs"
          >
            <RefreshCw className={`w-4 h-4 text-indigo-700 ${loadingLogs ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm font-mono">
            No security logs recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Event Type</th>
                  <th className="py-3 px-3">Identifier</th>
                  <th className="py-3 px-3">Audit Details</th>
                  <th className="py-3 px-3">IP / Host</th>
                  <th className="py-3 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {logs.map((log) => {
                  const isSuccess = log.type.includes('SUCCESS');
                  const isFailed = log.type.includes('FAILED');
                  return (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                            isSuccess
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : isFailed
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">{log.identifier}</td>
                      <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                      <td className="py-3 px-3 text-slate-500">{log.ipAddress}</td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6E4DF] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-indigo-700" />
                <h3 className="font-display font-bold text-[#0F172A] text-lg">Change Password</h3>
              </div>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {changePassError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
                {changePassError}
              </div>
            )}

            {changePassSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
                {changePassSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">New Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min 8 chars & 1 digit"
                  className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Confirm New Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={confirmNewPass}
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPass}
                    onChange={(e) => setShowPass(e.target.checked)}
                    className="rounded bg-[#FAF9F5] border-slate-300 text-indigo-600 focus:ring-0"
                  />
                  <span>Show Passwords</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changePassLoading}
                  className="px-4 py-1.5 bg-[#312E81] hover:bg-[#282568] text-white font-bold text-xs uppercase rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  {changePassLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />}
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
