import React from 'react';
import { Vacante } from '../services/api';
import { MapPin, DollarSign, Clock, Building2, ChevronRight, Award } from 'lucide-react';

interface JobCardProps {
  job: Vacante;
  onApplyClick: (job: Vacante) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick }) => {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
      
      {/* HEADER INFO */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Award className="w-3.5 h-3.5" />
            {job.nivelExperiencia}
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {new Date(job.fechaPublicacion).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors mb-2">
          {job.titulo}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-4 font-medium">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Building2 className="w-4 h-4 text-brand-400" />
            {job.empresa}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-4 h-4 text-purple-400" />
            {job.ubicacion} ({job.tipoJornada})
          </span>
          {job.salarioEstimado && (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
              <DollarSign className="w-3.5 h-3.5" />
              {job.salarioEstimado.toLocaleString()} USD / mes
            </span>
          )}
        </div>

        <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
          {job.descripcion}
        </p>
      </div>

      {/* FOOTER BUTTON */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Convocatoria Abierta
        </span>

        <button
          onClick={() => onApplyClick(job)}
          className="gradient-btn text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md group-hover:scale-105 transition-transform"
        >
          Postularme
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
