# 🔐 Guía de Configuración de Auth0 (OAuth2 / OIDC) - TalentoActivo

Esta guía documenta paso a paso el proceso completo de integración y resolución de seguridad con **Auth0** para la plataforma **TalentoActivo** (Spring Boot 3 + React Vite).

---

## 🏗️ Arquitectura de Seguridad

* **Proveedor de Identidad (IdP):** Auth0 (OpenID Connect / OAuth2).
* **Frontend Client (SPA):** React 18 + Vite (`http://localhost:5173`).
* **Backend Resource Server:** Spring Boot 3 + Spring Security 6 (`http://localhost:8080`).

---

## 📋 Paso 1: Configurar la Aplicación Web (Frontend SPA)

1. Ingresa a la consola de Auth0: **[manage.auth0.com](https://manage.auth0.com)**.
2. En el menú lateral, ve a **Applications** ➔ **Applications**.
3. Haz clic en **"+ Create Application"**.
   - **Name:** `TalentoActivo Web App`
   - **Application Type:** **Single Page Web Applications** (SPA).
4. Ve a la pestaña **Settings** y copia tus llaves:
   - `Domain`: `dev-xxxx.us.auth0.com`
   - `Client ID`: `s6kjJ7aSc4E6gQUrZClyRs174yy5IWXa` (ejemplo)
5. En la sección **Application URIs**, ingresa `http://localhost:5173` en los 4 campos:
   - **Allowed Callback URLs:** `http://localhost:5173`
   - **Allowed Logout URLs:** `http://localhost:5173`
   - **Allowed Web Origins:** `http://localhost:5173`
   - **Allowed Origins (CORS):** `http://localhost:5173`
6. Haz clic en **Save Changes**.

---

## 📋 Paso 2: Configurar la API REST (Backend Spring Boot)

1. En el menú lateral, ve a **Applications** ➔ **APIs**.
2. Haz clic en **"+ Create API"**.
   - **Name:** `TalentoActivo API`
   - **Identifier (Audience):** `https://api.talentoactivo.com`
   - **Signing Algorithm:** `RS256`
3. Ve a la pestaña **Machine to Machine Applications** (o *Authorized Applications*).
4. Busca `TalentoActivo Web App` en la lista y activa el interruptor a **Authorized** (Autorizado).
5. Haz clic en **Save**.

---

## ⚙️ Paso 3: Configuración en el Código del Proyecto

### 1. Frontend (`frontend/.env`)
```env
VITE_AUTH0_DOMAIN=dev-8xlvbif4xugov43x.us.auth0.com
VITE_AUTH0_CLIENT_ID=s6kjJ7aSc4E6gQUrZClyRs174yy5IWXa
VITE_AUTH0_AUDIENCE=https://api.talentoactivo.com
```

### 2. Backend (`backend/src/main/resources/application.yml`)
```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://dev-8xlvbif4xugov43x.us.auth0.com/

auth0:
  audience: https://api.talentoactivo.com
```

---

## 🛠️ Solución a Errores Frecuentes

| Error | Causa | Solución |
| :--- | :--- | :--- |
| **`Callback URL mismatch`** | La URL `http://localhost:5173` no está registrada en Auth0. | Agrega `http://localhost:5173` en *Allowed Callback URLs* en los Settings de la App. |
| **`Unknown client`** | El `Client ID` configurado no pertenece al Tenant activo. | Copia el `Client ID` correcto desde Auth0 Settings y pégalo en `.env`. |
| **`Service not found`** | El identificador de API `https://api.talentoactivo.com` no existe. | Crea la API en Auth0 ➔ APIs con Identifier `https://api.talentoactivo.com`. |
| **`Client is not authorized`** | La App SPA no tiene permisos para solicitar tokens de la API. | En APIs ➔ `TalentoActivo API` ➔ *Machine to Machine Applications*, autoriza la App. |

---

## 👤 Autor

* **Fredy Alexander Cuastumal**
