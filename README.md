# 🚀 TalentoActivo - Plataforma Empresarial de Talento & Empleo

**TalentoActivo** es una solución full-stack moderna de gestión de talento y reclutamiento construida con **Spring Boot 3**, **Spring Security 6**, **Auth0 (OAuth2 / OIDC)** y un cliente **Vite + React + Tailwind CSS**.

---

## 🏗️ Arquitectura del Proyecto

```text
TalentoActivo/
├── backend/                    # API RESTful en Spring Boot 3
│   ├── pom.xml                 # Maven Wrapper & Dependencias
│   └── src/main/java/com/talentoactivo/
│       ├── config/             # Spring Security 6 & Validator JWT Auth0
│       ├── controller/         # REST Endpoints (Públicos, Usuarios, Vacantes, Postulaciones)
│       ├── model/              # Entidades JPA (Usuario, Vacante, Postulacion)
│       └── repository/         # Interfaces Spring Data JPA
├── frontend/                   # Aplicación Web SPA en React Vite
│   ├── package.json            # Auth0 React SDK, Tailwind CSS, Lucide Icons
│   ├── src/
│   │   ├── components/         # Navbar, Hero, JobCard, JobModal, Dashboards
│   │   ├── services/           # Consumo de la REST API (Fetch + JWT Header)
│   │   └── App.tsx             # Interfaz dinámica con estado de autenticación
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Java 17+, Spring Boot 3.2, Spring Security 6, OAuth2 Resource Server, Spring Data JPA.
* **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons.
* **Seguridad & Autenticación:** Auth0 (OpenID Connect / OAuth2 JWT).
* **Base de Datos:** MySQL 8+.

---

## ⚙️ Instrucciones de Inicio Rápido

### 1. Iniciar el Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173`.

### 2. Configurar Variables de Entorno de Auth0
Edita el archivo `frontend/.env` con tus claves de Auth0:
```env
VITE_AUTH0_DOMAIN=tu-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=tu_client_id_spa
VITE_AUTH0_AUDIENCE=https://api.talentoactivo.com
```

### 3. Iniciar el Backend (Spring Boot 3)
Asegúrate de tener corriendo MySQL y ejecuta el backend desde tu IDE o mediante Maven:
```bash
cd backend
mvn spring-boot:run
```

---

## 🌐 Despliegue en Producción

### 1. Frontend (Vercel - Recomendado Gratuito)
1. Sube tu código a un repositorio en **GitHub**.
2. Entra a [Vercel.com](https://vercel.com) e importa el directorio `frontend/`.
3. Configura las variables de entorno en Vercel:
   - `VITE_AUTH0_DOMAIN`: `tu-tenant.us.auth0.com`
   - `VITE_AUTH0_CLIENT_ID`: `tu_client_id`
   - `VITE_AUTH0_AUDIENCE`: `https://api.talentoactivo.com`

### 2. Backend (Render.com / Railway.app)
1. Conecta tu repositorio de GitHub en [Render.com](https://render.com).
2. Crea un **Web Service** seleccionando el directorio `backend/` o el `Dockerfile`.
3. Configura las variables de entorno de la base de datos MySQL y Auth0.

### 3. Actualizar URLs en Auth0 Dashboard
En tu consola de Auth0 (Pestaña *Settings* de tu App), agrega el dominio de producción a las URLs permitidas:
- **Allowed Callback URLs**: `https://tu-app.vercel.app`
- **Allowed Logout URLs**: `https://tu-app.vercel.app`
- **Allowed Web Origins**: `https://tu-app.vercel.app`
- **Allowed Origins (CORS)**: `https://tu-app.vercel.app`

---

## 👤 Autor

* **Fredy Alexander Cuastumal**
