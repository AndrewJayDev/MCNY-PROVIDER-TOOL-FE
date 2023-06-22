/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly  VITE_REGION: string
    readonly  VITE_USERPOOLID: string
    readonly  VITE_USERPOOLWEBCLIENTID: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }