import React from 'react';
import { AuthSession } from '../types';
import { AuthMode } from '../lib/api';
import { ShieldCheck, Lock, KeyRound, Server, HardDrive, CheckCircle2 } from 'lucide-react';

interface SecurityMetricsProps {
  session: AuthSession | null;
  activeMode: AuthMode;
}

export const SecurityMetrics: React.FC<SecurityMetricsProps> = ({ session, activeMode }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-7xl mx-auto mb-6">
      <div className="bg-white border border-[#E6E4DF] rounded-xl p-3 flex items-center space-x-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Password Storage</span>
          <span className="text-xs font-bold text-slate-900 font-mono">
            {activeMode === 'express_bcrypt' ? 'Bcrypt Salted' : 'SHA-256 Web Crypto'}
          </span>
        </div>
      </div>

      <div className="bg-white border border-[#E6E4DF] rounded-xl p-3 flex items-center space-x-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Obfuscated Errors</span>
          <span className="text-xs font-bold text-slate-900 font-mono">Generic Protection</span>
        </div>
      </div>

      <div className="bg-white border border-[#E6E4DF] rounded-xl p-3 flex items-center space-x-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-2 bg-purple-50 border border-purple-100 rounded-lg text-purple-700">
          <KeyRound className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Session Guard</span>
          <span className="text-xs font-bold text-slate-900 font-mono">
            {session ? 'Authenticated' : 'Protected'}
          </span>
        </div>
      </div>

      <div className="bg-white border border-[#E6E4DF] rounded-xl p-3 flex items-center space-x-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-2 bg-amber-50 border border-amber-100 rounded-lg text-amber-700">
          {activeMode === 'express_bcrypt' ? <Server className="w-4 h-4" /> : <HardDrive className="w-4 h-4" />}
        </div>
        <div>
          <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">Active Engine</span>
          <span className="text-xs font-bold text-indigo-700 font-mono truncate block">
            {activeMode === 'express_bcrypt' ? 'Express REST' : 'LocalStorage Client'}
          </span>
        </div>
      </div>
    </div>
  );
};
