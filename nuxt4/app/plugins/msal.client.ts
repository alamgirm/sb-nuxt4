import { ref, readonly } from 'vue'
import { PublicClientApplication, type Configuration, type AccountInfo } from '@azure/msal-browser'

// Global state
let msalInstance: PublicClientApplication | null = null
let isInitialized = false
let isInitializing = false

// Global reactive state
const user = ref<AccountInfo | null>(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Initialize MSAL
const initMsal = async (): Promise<PublicClientApplication> => {
  if (isInitialized) return msalInstance!
  if (isInitializing) {
    // Wait for ongoing initialization
    return new Promise((resolve) => {
      const checkInit = () => {
        if (isInitialized) {
          resolve(msalInstance!)
        } else {
          setTimeout(checkInit, 10)
        }
      }
      checkInit()
    })
  }

  isInitializing = true
  isLoading.value = true

  try {
    console.log('Initializing MSAL in plugin...')
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

    msalInstance = new PublicClientApplication(msalConfig)
    await msalInstance.initialize()
    
    // Handle redirect result
    const response = await msalInstance.handleRedirectPromise()
    if (response?.account) {
      user.value = response.account
      isAuthenticated.value = true
      console.log('Authentication successful from redirect')
    } else {
      // Check for existing accounts
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        user.value = accounts[0]
        isAuthenticated.value = true
        console.log('Found existing account')
      }
    }
    
    isInitialized = true
    console.log('MSAL initialization complete in plugin')
    return msalInstance
  } catch (err) {
    console.error('MSAL initialization error:', err)
    error.value = 'Failed to initialize authentication'
    throw err
  } finally {
    isLoading.value = false
    isInitializing = false
  }
}

export default defineNuxtPlugin(async () => {
  // Initialize MSAL when plugin loads
  await initMsal()
  
  return {
    provide: {
      msal: msalInstance,
      msalConfig: {
        clientId: useRuntimeConfig().public.msal.clientId,
        authority: useRuntimeConfig().public.msal.authority,
        redirectUri: useRuntimeConfig().public.msal.redirectUri,
        apiScope: useRuntimeConfig().public.msal.apiScope
      },
      // Expose reactive state
      authState: {
        user: readonly(user),
        isAuthenticated: readonly(isAuthenticated),
        isLoading: readonly(isLoading),
        error: readonly(error)
      }
    }
  }
})
