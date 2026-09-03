import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { ApplicationsDashboard } from './components/ApplicationsDashboard';
import { AdminJobManager } from './components/AdminJobManager';
import { Vacante, fetchVacantesPublicas } from './services/api';
import { Shield, Database, Layout } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'admin'>('jobs');
  const [jobs, setJobs] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('TODOS');
  const [selectedJobForApply, setSelectedJobForApply] = useState<Vacante | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchVacantesPublicas();
      setJobs(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.empresa.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      selectedFilter === 'TODOS' || job.nivelExperiencia.toUpperCase() === selectedFilter;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      
      {/* NAVBAR */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* CONTENT AREA */}
      <main className="flex-1">
        {activeTab === 'jobs' && (
          <div>
            {/* HERO SECTION */}
            <Hero
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            {/* JOBS GRID SECTION */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    <Layout className="w-6 h-6 text-brand-400" />
                    Oportunidades Destacadas
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {filteredJobs.length} vacantes activas filtradas por disponibilidad y nivel técnico.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-400 text-sm">Cargando vacantes desde Spring Boot REST API...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="glass-card p-12 rounded-3xl text-center border border-slate-800">
                  <p className="text-slate-300 font-semibold mb-1">No se encontraron vacantes coincidentes</p>
                  <p className="text-slate-500 text-xs">Intenta ajustar tu búsqueda o el filtro de nivel de experiencia.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApplyClick={(jobToApply) => setSelectedJobForApply(jobToApply)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {activeTab === 'applications' && <ApplicationsDashboard />}

        {activeTab === 'admin' && <AdminJobManager />}
      </main>

      {/* JOB APPLICATION MODAL */}
      <JobModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />

      {/* FOOTER */}
      <footer className="glass-card border-t border-slate-800/80 py-8 px-4 text-center text-slate-500 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-400" />
            <span className="font-semibold text-slate-400">TalentoActivo Platform</span>
            <span>- Arquitectura Enterprise con Spring Boot 3 & Auth0</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5 text-purple-400" /> MySQL JPA</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> OAuth2 / OIDC</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
