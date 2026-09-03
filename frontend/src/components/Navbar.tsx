import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Briefcase, ShieldCheck, LogIn, LogOut, User, LayoutDashboard, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'jobs' | 'applications' | 'admin';
  setActiveTab: (tab: 'jobs' | 'applications' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          onClick={() => setActiveTab('jobs')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Talento<span className="gradient-text">Activo</span>
              <span className="text-[10px] uppercase font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> OAuth2 / Auth0
              </span>
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-800/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'jobs'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Vacantes Disponibles
          </button>
          
          {isAuthenticated && (
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'applications'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Mis Postulaciones
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Publicar Empleo
            </button>
          )}
        </nav>

        {/* AUTH BUTTONS / USER PROFILE */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3 bg-dark-800/80 border border-slate-700/60 rounded-xl p-1.5 pl-3">
              <div className="flex flex-col text-right hidden sm:block">
                <span className="text-xs font-semibold text-white truncate max-w-[130px]">
                  {user.name || user.nickname}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Autenticado OIDC
                </span>
              </div>
              
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/50" 
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}

              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                title="Cerrar Sesión"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="gradient-btn text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:scale-95 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Iniciar Sesión con Auth0
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
