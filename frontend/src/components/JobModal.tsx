import React, { useState } from 'react';
import { Vacante, aplicarAVacante } from '../services/api';
import { useAuth0 } from '@auth0/auth0-react';
import { X, Send, ShieldAlert, CheckCircle, LogIn, Building2, MapPin, DollarSign } from 'lucide-react';

interface JobModalProps {
  job: Vacante | null;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [carta, setCarta] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let token: string | null = null;
      if (isAuthenticated) {
        token = await getAccessTokenSilently().catch(() => null);
      }

      await aplicarAVacante(token, job.id, carta);
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al procesar tu postulación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 relative border border-slate-700/80 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">¡Postulación Enviada con Éxito!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              Tu perfil ha sido registrado en la plataforma. La empresa <strong>{job.empresa}</strong> revisará tu candidatura.
            </p>
            <button
              onClick={onClose}
              className="gradient-btn text-white px-6 py-2.5 rounded-xl font-semibold text-sm"
            >
              Entendido
            </button>
          </div>
        ) : (
          <div>
            {/* HEADER */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                {job.nivelExperiencia}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
                {job.titulo}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-brand-400" />
                  {job.empresa}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {job.ubicacion} ({job.tipoJornada})
                </span>
                {job.salarioEstimado && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {job.salarioEstimado.toLocaleString()} USD / mes
                  </span>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6 bg-dark-800/80 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed max-h-48 overflow-y-auto">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Puesto</h4>
              <p>{job.descripcion}</p>
            </div>

            {/* AUTH CHECK / FORM */}
            {!isAuthenticated ? (
              <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-center">
                <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-amber-200 mb-1">Inicia Sesión con Auth0 para Postularte</h4>
                <p className="text-xs text-slate-300 mb-4">
                  Para enviar tu información directamente al reclutador debes autenticarte de forma segura con OAuth2/OIDC.
                </p>
                <button
                  onClick={() => loginWithRedirect()}
                  className="gradient-btn text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Iniciar Sesión Ahora
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Carta de Presentación / Mensaje al Reclutador (Opcional):
                  </label>
                  <textarea
                    rows={4}
                    value={carta}
                    onChange={(e) => setCarta(e.target.value)}
                    placeholder="Explica brevemente por qué eres el candidato idóneo para esta vacante..."
                    className="w-full bg-dark-800 text-white placeholder-slate-500 text-sm rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="gradient-btn text-white px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Confirmar Postulación
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
