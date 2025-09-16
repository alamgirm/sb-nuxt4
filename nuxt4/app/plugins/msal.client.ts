import { PublicClientApplication, type Configuration } from '@azure/msal-browser'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const msalConfig: Configuration = {
    auth: {
      clientId: config.public.msal.clientId,
      authority: config.public.msal.authority,
      redirectUri: config.public.msal.redirectUri,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  }

  const msalInstance = new PublicClientApplication(msalConfig)

  return {
    provide: {
      msal: msalInstance
    }
  }
})
