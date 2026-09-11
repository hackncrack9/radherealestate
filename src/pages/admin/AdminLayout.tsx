import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Download,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { useProperties } from '../../context/PropertyContext';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout, loginAsUser } = useAdminAuth();
  const { properties, leads, resetToDefaults, exportData } = useProperties();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'All Properties',
      path: '/admin/properties',
      icon: Building2,
      count: properties.length,
    },
    {
      name: 'Add Property',
      path: '/admin/properties/new',
      icon: PlusCircle,
    },
    {
      name: 'Client Inquiries',
      path: '/admin/leads',
      icon: Users,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : undefined,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0E131A] text-slate-200 flex flex-col md:flex-row font-sans selection:bg-brand-gold selection:text-black">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-[#141A23] border-r border-slate-800/80 p-5 z-30">
        <div>
          {/* Admin Wordmark */}
          <Link to="/admin" className="flex items-center gap-3 pb-6 border-b border-slate-800/80 group">
            <div className="w-9 h-9 border border-brand-gold/60 bg-brand-dark flex items-center justify-center">
              <span className="font-serif font-bold text-base text-brand-gold">R</span>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-widest text-white uppercase block">
                RADHE PORTAL
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-brand-gold uppercase block">
                MANAGEMENT SYSTEM
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${
                    isActive
                      ? 'bg-brand-gold text-brand-dark font-semibold shadow-gold-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-dark' : 'text-brand-gold'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-red-500 text-white rounded-none animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && !item.badge && (
                    <span
                      className={`text-[10px] ${
                        isActive ? 'text-brand-dark font-bold' : 'text-slate-500'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="space-y-4 pt-6 border-t border-slate-800/80 text-xs">
          {/* Switch User / Active Profile */}
          <div className="p-3 bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase tracking-widest text-slate-500">
                Active Session
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => loginAsUser('suresh')}
                  title="Switch to Suresh Sharma"
                  className={`px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${
                    user?.name === 'Suresh Sharma'
                      ? 'bg-brand-gold text-black font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Suresh
                </button>
                <button
                  onClick={() => loginAsUser('monu')}
                  title="Switch to Monu Sharma"
                  className={`px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${
                    user?.name === 'Monu Sharma'
                      ? 'bg-brand-gold text-black font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Monu
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-serif font-bold text-xs">
                {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-white truncate text-xs">{user?.name}</p>
                <p className="text-[10px] text-brand-gold-light truncate">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors text-xs"
            >
              <Download className="w-3.5 h-3.5 text-brand-gold" />
              <span>Backup & Data Tools</span>
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors text-xs"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
                <span>View Live Site</span>
              </span>
              <span className="text-[9px] text-brand-gold">↗</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="md:hidden bg-[#141A23] border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 border border-brand-gold/60 bg-brand-dark flex items-center justify-center">
            <span className="font-serif font-bold text-xs text-brand-gold">R</span>
          </div>
          <span className="font-serif text-xs font-bold tracking-widest text-white uppercase">
            RADHE ADMIN
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141A23] border-b border-slate-800 p-4 space-y-3 animate-fadeIn">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs">
              <p className="font-medium text-white">{user?.name}</p>
              <p className="text-[10px] text-brand-gold">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] bg-red-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 text-xs uppercase tracking-wider text-brand-gold"
            >
              <span>View Live Website</span>
              <span>↗</span>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Backup & Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141A23] border border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg text-white">Data Management & Backup</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              All properties and consultation inquiries are stored in your browser's persistent storage. You can download a complete JSON backup anytime or restore the original seed listings.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  exportData();
                  setShowSettingsModal(false);
                }}
                className="w-full py-2.5 px-4 bg-brand-gold text-brand-dark text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-brand-gold-light transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON Backup File</span>
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to restore all properties and inquiries to default sample data? Any custom additions will be reset.'
                    )
                  ) {
                    resetToDefaults();
                    setShowSettingsModal(false);
                  }
                }}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-red-950/40 text-red-300 border border-slate-700 hover:border-red-500/40 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>Reset to Seed Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
