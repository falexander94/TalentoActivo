import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Postulacion, fetchMisPostulaciones } from '../services/api';
import { CheckCircle2, Clock, XCircle, Building2, MapPin, Briefcase } from 'lucide-react';

export const ApplicationsDashboard: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = await getAccessTokenSilently().catch(() => null);
        const data = await fetchMisPostulaciones(token);
        setPostulaciones(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, [getAccessTokenSilently]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Cargando tus postulaciones autenticadas con Auth0...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-brand-400" />
          Panel de Mis Postulaciones
        </h2>
        <p className="text-slate-400 text-sm">
          Sigue el progreso en tiempo real de tus candidaturas enviadas a través de la API protegida.
        </p>
      </div>

      {postulaciones.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center border border-slate-800">
          <Clock className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Aún no te has postulado a ninguna vacante</h3>
          <p className="text-slate-400 text-sm mb-4">Explora el catálogo público de empleos y aplica con un clic.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {postulaciones.map((item) => (
            <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full">
                  {item.vacante.nivelExperiencia}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">{item.vacante.titulo}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {item.vacante.empresa}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.vacante.ubicacion}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  {item.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
