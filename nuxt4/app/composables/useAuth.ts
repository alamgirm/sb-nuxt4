import { ref, readonly } from 'vue'
import { PublicClientApplication, type Configuration, type AccountInfo, type SilentRequest, type RedirectRequest } from '@azure/msal-browser'

// Simple global state - no reactive dependencies
let msalInstance: PublicClientApplication | null = null
let isInitialized = false

// Global reactive state
const user = ref<AccountInfo | null>(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)
const isClient = ref(process.client)

// Initialize MSAL only once
const initMsal = async () => {
  if (isInitialized || !process.client) return
  
  try {
    console.log('Initializing MSAL...')
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
    console.log('MSAL initialization complete')
  } catch (err) {
    console.error('MSAL initialization error:', err)
    error.value = 'Failed to initialize authentication'
  }
}

export const useAuth = () => {
  // Initialize MSAL if not already done
  if (!isInitialized && process.client) {
    initMsal()
  }

  const login = async (loginType: 'redirect' | 'popup' = 'redirect') => {
    if (!msalInstance) {
      console.error('MSAL not initialized')
      return
    }

    try {
      isLoading.value = true
      error.value = null

      const config = useRuntimeConfig()
      const loginRequest: RedirectRequest = {
        scopes: ['openid', 'profile', 'email', config.public.msal.apiScope],
        prompt: 'select_account'
      }

      if (loginType === 'redirect') {
        await msalInstance.loginRedirect(loginRequest)
      } else {
        const response = await msalInstance.loginPopup(loginRequest)
        if (response.account) {
          user.value = response.account
          isAuthenticated.value = true
        }
      }
    } catch (err: any) {
      if (err.errorCode === 'interaction_in_progress') {
        console.log('Authentication interaction already in progress')
        return
      }
      error.value = 'Login failed'
      console.error('Login error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    if (!msalInstance) return

    try {
      isLoading.value = true
      await msalInstance.logoutRedirect({
        account: user.value
      })
      user.value = null
      isAuthenticated.value = false
    } catch (err) {
      error.value = 'Logout failed'
      console.error('Logout error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getAccessToken = async (): Promise<string | null> => {
    if (!msalInstance || !user.value) return null

    try {
      const config = useRuntimeConfig()
      const silentRequest: SilentRequest = {
        scopes: [config.public.msal.apiScope],
        account: user.value
      }

      const response = await msalInstance.acquireTokenSilent(silentRequest)
      return response.accessToken
    } catch (err) {
      console.error('Token acquisition error:', err)
      return null
    }
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isClient: readonly(isClient),
    login,
    logout,
    getAccessToken
  }
}