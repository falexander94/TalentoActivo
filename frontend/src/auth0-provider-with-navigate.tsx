import React, { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface Auth0ProviderWithConfigProps {
  children: ReactNode;
}

export const Auth0ProviderWithConfig: React.FC<Auth0ProviderWithConfigProps> = ({ children }) => {
  // Valores por defecto que el usuario puede sobrescribir con variables de entorno o archivo .env
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || "dev-talentoactivo.us.auth0.com";
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "PLACEHOLDER_CLIENT_ID";
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || "https://api.talentoactivo.com";

  const onRedirectCallback = (appState: any) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    );
  };

  if (!(domain && clientId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900 text-white p-6">
        <div className="glass-card p-8 rounded-2xl max-w-md text-center border border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-2">Configuración de Auth0 Requerida</h2>
          <p className="text-slate-300 text-sm mb-4">
            Debes definir <code className="bg-slate-800 px-2 py-1 rounded">VITE_AUTH0_DOMAIN</code> y <code className="bg-slate-800 px-2 py-1 rounded">VITE_AUTH0_CLIENT_ID</code> en tu archivo <code className="text-brand-400">.env</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
