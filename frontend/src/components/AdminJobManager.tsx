import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PlusCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export const AdminJobManager: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [titulo, setTitulo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipoJornada, setTipoJornada] = useState('REMOTO');
  const [salario, setSalario] = useState('4000');
  const [nivel, setNivel] = useState('MID');
  const [descripcion, setDescripcion] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('');

    try {
      const token = await getAccessTokenSilently().catch(() => null);

      const res = await fetch('/api/v1/vacantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          empresa,
          ubicacion,
          tipoJornada,
          salarioEstimado: parseFloat(salario),
          nivelExperiencia: nivel,
          descripcion,
          activa: true
        })
      });

      if (!res.ok) throw new Error('Error al registrar la vacante');

      setStatusMsg('¡Vacante publicada exitosamente en el servidor Spring Boot!');
      setTitulo('');
      setDescripcion('');
    } catch (err: any) {
      setStatusMsg('Publicado en modo demostración local.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="glass-card p-8 rounded-3xl border border-red-500/30">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Acceso Restringido (Spring Security 6)</h3>
          <p className="text-slate-300 text-xs">
            Esta sección está reservada para Reclutadores y Administradores autenticados mediante Auth0.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <PlusCircle className="w-8 h-8 text-purple-400" />
          Publicar Nueva Vacante de Empleo
        </h2>
        <p className="text-slate-400 text-sm">
          Crea una nueva oportunidad laboral. Esta petición enviará un token JWT con firma protegida a la API REST.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
        {statusMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Título del Puesto</label>
            <input
              type="text"
              required
              placeholder="Ej. Senior Java Spring Boot Engineer"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Empresa</label>
              <input
                type="text"
                required
                placeholder="Ej. TalentoActivo Tech"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ubicación</label>
              <input
                type="text"
                required
                placeholder="Ej. Remoto / Ciudad de México"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tipo Jornada</label>
              <select
                value={tipoJornada}
                onChange={(e) => setTipoJornada(e.target.value)}
                className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="REMOTO">REMOTO</option>
                <option value="HIBRIDO">HÍBRIDO</option>
                <option value="PRESENCIAL">PRESENCIAL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Salario Estimado (USD/mes)</label>
              <input
                type="number"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nivel de Experiencia</label>
              <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="JUNIOR">JUNIOR</option>
                <option value="MID">MID LEVEL</option>
                <option value="SENIOR">SENIOR</option>
                <option value="LEAD">LEAD / ARCHITECT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Descripción de la Vacante</label>
            <textarea
              rows={4}
              required
              placeholder="Detalla los requisitos técnicos, responsabilidades y beneficios..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full bg-dark-800 text-white text-sm rounded-xl p-3 border border-slate-700 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 transition-all"
          >
            Publicar Vacante en API REST
          </button>
        </form>
      </div>

    </div>
  );
};
