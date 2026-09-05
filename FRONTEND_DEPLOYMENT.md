# 🚀 Guía de Despliegue del Frontend (Vite + React) en Vercel

Esta guía detalla el proceso completo para publicar la interfaz web de **TalentoActivo** en **Vercel** de forma gratuita con certificado SSL automático y CDN global.

---

## 📋 Paso 1: Importar el Proyecto en Vercel

1. Ingresa a **[vercel.com/new](https://vercel.com/new)**.
2. Inicia sesión con tu cuenta de **GitHub** (`falexander94`).
3. Busca el repositorio **`TalentoActivo`** y haz clic en **`Import`**.

---

## ⚙️ Paso 2: Configuración del Root Directory & Variables

En la pantalla de configuración de Vercel antes de compilar:

### 1. Root Directory (Carpeta Raíz)
- Haz clic en **Edit** al lado de *Root Directory*.
- Selecciona la subcarpeta **`frontend`** y presiona **Save**.

### 2. Variables de Entorno (Environment Variables)
Despliega el panel **Environment Variables** y añade las siguientes 3 claves:

| Key (Nombre de Variable) | Value (Valor Exacto) |
| :--- | :--- |
| **`VITE_AUTH0_DOMAIN`** | `dev-8xlvbif4xugov43x.us.auth0.com` |
| **`VITE_AUTH0_CLIENT_ID`** | `s6kjJ7aSc4E6gQUrZClyRs174yy5IWXa` |
| **`VITE_AUTH0_AUDIENCE`** | `https://api.talentoactivo.com` |

3. Haz clic en el botón azul **`Deploy`**. Vercel compilará la aplicación en ~30 segundos.

---

## 🔐 Paso 3: Autorizar la nueva URL en Auth0

Una vez Vercel publique tu sitio, obtendrás un enlace público HTTPS (ejemplo: `https://talento-activo.vercel.app`).

1. Entra a las configuraciones de tu App en Auth0:
   👉 **[Configuración de App en Auth0](https://manage.auth0.com/#/applications/s6kjJ7aSc4E6gQUrZClyRs174yy5IWXa/settings)**

2. En la sección **Application URIs**, agrega la nueva URL de Vercel separada por coma `,`:
   - **Allowed Callback URLs:** `http://localhost:5173, https://tu-app.vercel.app`
   - **Allowed Logout URLs:** `http://localhost:5173, https://tu-app.vercel.app`
   - **Allowed Web Origins:** `http://localhost:5173, https://tu-app.vercel.app`
   - **Allowed Origins (CORS):** `http://localhost:5173, https://tu-app.vercel.app`

3. Baja al final de la página y haz clic en **Save Changes**.

---

## 🌐 ¡Listo!
Tu Frontend estará 100% público, en vivo en Internet, con autenticación segura de Auth0.
