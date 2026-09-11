import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, User, ShieldCheck, ArrowRight, Home } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { SEO } from '../../components/common/SEO';

export const AdminLogin: React.FC = () => {
  const { login, loginAsUser, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('radhe2026');
  const [error, setError] = useState('');

  // If already logged in, redirect to admin home
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/admin';
    navigate(from, { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Hint: use username "admin" and password "radhe2026"');
    }
  };

  const handleQuickLogin = (role: 'suresh' | 'monu') => {
    loginAsUser(role);
    navigate('/admin');
  };

  return (
    <>
      <SEO title="Admin Login | Radhe Real Estate" />

      <div className="min-h-screen bg-[#0A0D13] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-brand-gold selection:text-black">
        {/* Subtle Background Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md w-full bg-[#131922] border border-slate-800 shadow-2xl p-8 sm:p-10 text-left">
          {/* Top Brand Emblem */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 border border-brand-gold/60 bg-brand-dark flex items-center justify-center shadow-gold-glow">
              <span className="font-serif font-bold text-2xl text-brand-gold">R</span>
            </div>
            <h1 className="font-serif text-2xl text-white tracking-wide">
              Radhe Real Estate
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold mt-1">
              Admin & Property Portal
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-950/50 border border-red-800/80 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or suresh"
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0E15] border border-slate-700 focus:border-brand-gold focus:outline-none text-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0E15] border border-slate-700 focus:border-brand-gold focus:outline-none text-white transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-semibold uppercase tracking-widest text-xs transition-all shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-3 text-center">
              Quick 1-Click Access
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                onClick={() => handleQuickLogin('suresh')}
                className="py-2.5 px-3 bg-slate-900 border border-slate-700 hover:border-brand-gold text-slate-300 hover:text-white transition-colors flex flex-col items-center"
              >
                <span className="font-medium text-white">Suresh Sharma</span>
                <span className="text-[9px] text-brand-gold">Owner & Founder</span>
              </button>

              <button
                onClick={() => handleQuickLogin('monu')}
                className="py-2.5 px-3 bg-slate-900 border border-slate-700 hover:border-brand-gold text-slate-300 hover:text-white transition-colors flex flex-col items-center"
              >
                <span className="font-medium text-white">Monu Sharma</span>
                <span className="text-[9px] text-brand-gold">Operational Manager</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-gold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
