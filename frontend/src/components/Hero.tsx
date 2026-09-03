import React from 'react';
import { Search, Sparkles, Shield, Cpu, Lock } from 'lucide-react';

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <div className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-900/20 via-dark-900 to-dark-900 border-b border-slate-800/50">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" />
          <span>Plataforma Full-Stack: Spring Boot 3 + React + Auth0</span>
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          El Ecosistema Inteligente para <br className="hidden sm:inline" />
          <span className="gradient-text">Talento Técnico de Alto Nivel</span>
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Conectamos ingenieros y especialistas de software con ofertas exclusivas. Autenticación delegada con <strong>OAuth2 / OIDC</strong> y protección de rutas mediante <strong>Spring Security 6</strong>.
        </p>

        {/* SEARCH BAR & FILTERS */}
        <div className="glass-card p-3 rounded-2xl max-w-2xl mx-auto shadow-2xl border border-slate-700/60 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar vacantes (ej. Spring Boot, React, DevOps)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-800/90 text-white placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full sm:w-auto bg-dark-800/90 text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="TODOS">Todos los Niveles</option>
              <option value="JUNIOR">Junior</option>
              <option value="MID">Mid Level</option>
              <option value="SENIOR">Senior</option>
              <option value="LEAD">Lead / Architect</option>
            </select>

          </div>
        </div>

        {/* METRICS & FEATURES STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-slate-400 text-xs">
          <div className="flex items-center justify-center gap-2 glass-card py-2.5 px-4 rounded-xl border border-slate-800">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Auth0 OIDC Integration</span>
          </div>
          <div className="flex items-center justify-center gap-2 glass-card py-2.5 px-4 rounded-xl border border-slate-800">
            <Cpu className="w-4 h-4 text-brand-400" />
            <span>Spring Security 6 Resource Server</span>
          </div>
          <div className="flex items-center justify-center gap-2 glass-card py-2.5 px-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>JWT Bearer Protection</span>
          </div>
        </div>

      </div>
    </div>
  );
};
