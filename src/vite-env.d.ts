/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_SERVER_HOST: string;
  readonly VITE_SERVER_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
