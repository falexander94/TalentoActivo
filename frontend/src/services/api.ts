export interface Vacante {
  id: number;
  titulo: string;
  descripcion: string;
  empresa: string;
  ubicacion: string;
  tipoJornada: string;
  salarioEstimado: number;
  nivelExperiencia: string;
  activa: boolean;
  fechaPublicacion: string;
}

export interface Postulacion {
  id: number;
  vacante: Vacante;
  estado: string;
  cartaPresentacion?: string;
  fechaPostulacion: string;
}

const API_BASE_URL = '/api/v1';

// MOCK DATA DE DEMOSTRACIÓN (si el backend Spring Boot aún no está activo)
export const MOCK_VACANTES: Vacante[] = [
  {
    id: 1,
    titulo: "Senior Full Stack Engineer (Spring Boot + React)",
    descripcion: "Buscamos un Ingeniero Full Stack con sólida experiencia en Java 17+, Spring Security 6, microservicios y React con TypeScript. Liderarás la arquitectura de nuestra plataforma SaaS.",
    empresa: "TechActive Solutions",
    ubicacion: "Remoto (Latam)",
    tipoJornada: "REMOTO",
    salarioEstimado: 4500,
    nivelExperiencia: "SENIOR",
    activa: true,
    fechaPublicacion: "2026-08-28T10:00:00"
  },
  {
    id: 2,
    titulo: "Backend Developer (Java & Cloud AWS)",
    descripcion: "Únete a nuestro equipo para construir APIs RESTful de alto rendimiento usando Spring Boot 3, Hibernate JPA y despliegues serverless en AWS Lambda y ECS.",
    empresa: "Fintech Enterprise",
    ubicacion: "Bogotá, Colombia",
    tipoJornada: "HIBRIDO",
    salarioEstimado: 3800,
    nivelExperiencia: "MID",
    activa: true,
    fechaPublicacion: "2026-08-27T14:30:00"
  },
  {
    id: 3,
    titulo: "Cybersecurity & Identity Specialist (OAuth2 / Auth0)",
    descripcion: "Especialista en identidad digital encargados de integrar flujos OIDC, SSO y Spring Security en aplicaciones críticas de misión empresarial.",
    empresa: "CyberGuard Global",
    ubicacion: "Remoto",
    tipoJornada: "REMOTO",
    salarioEstimado: 5200,
    nivelExperiencia: "LEAD",
    activa: true,
    fechaPublicacion: "2026-08-29T09:15:00"
  }
];

export async function fetchVacantesPublicas(): Promise<Vacante[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/vacantes/publicas`);
    if (!res.ok) throw new Error('Error al conectar con la API');
    return await res.json();
  } catch (error) {
    console.warn('Backend API no disponible. Utilizando datos demostrativos.');
    return MOCK_VACANTES;
  }
}

export async function aplicarAVacante(token: string | null, vacanteId: number, cartaPresentacion: string): Promise<any> {
  if (!token) {
    // Simulación de aplicación si es modo demostración
    return new Promise(resolve => setTimeout(() => resolve({ success: true, mock: true }), 800));
  }

  const res = await fetch(`${API_BASE_URL}/postulaciones/aplicar/${vacanteId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ cartaPresentacion })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Error al aplicar a la vacante');
  }

  return await res.json();
}

export async function fetchMisPostulaciones(token: string | null): Promise<Postulacion[]> {
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/postulaciones/mis-postulaciones`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Error al obtener postulaciones');
    return await res.json();
  } catch (error) {
    return [];
  }
}
