import type { AuthenticationResult, AccountInfo, SilentRequest, RedirectRequest } from '@azure/msal-browser'

export const useAuth = () => {
  const { $msal } = useNuxtApp()
  const config = useRuntimeConfig()
  
  const user = ref<AccountInfo | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const initializeAuth = async () => {
    try {
      isLoading.value = true
      await $msal.initialize()
      
      const accounts = $msal.getAllAccounts()
      if (accounts.length > 0) {
        user.value = accounts[0]
        isAuthenticated.value = true
      }
    } catch (err) {
      error.value = 'Failed to initialize authentication'
      console.error('Auth initialization error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const login = async (loginType: 'redirect' | 'popup' = 'redirect') => {
    try {
      isLoading.value = true
      error.value = null

      const loginRequest: RedirectRequest = {
        scopes: ['openid', 'profile', 'email', config.public.msal.apiScope],
        prompt: 'select_account'
      }

      if (loginType === 'redirect') {
        await $msal.loginRedirect(loginRequest)
      } else {
        const response = await $msal.loginPopup(loginRequest)
        handleAuthResponse(response)
      }
    } catch (err) {
      error.value = 'Login failed'
      console.error('Login error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      await $msal.logoutRedirect({
        account: user.value
      })
    } catch (err) {
      error.value = 'Logout failed'
      console.error('Logout error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const handleAuthResponse = (response: AuthenticationResult) => {
    if (response.account) {
      user.value = response.account
      isAuthenticated.value = true
    }
  }

  const getAccessToken = async (): Promise<string | null> => {
    try {
      if (!user.value) return null

      const silentRequest: SilentRequest = {
        scopes: [config.public.msal.apiScope],
        account: user.value
      }

      const response = await $msal.acquireTokenSilent(silentRequest)
      return response.accessToken
    } catch (err) {
      console.error('Token acquisition error:', err)
      return null
    }
  }

  const handleRedirectResult = async () => {
    try {
      const response = await $msal.handleRedirectPromise()
      if (response) {
        handleAuthResponse(response)
      }
    } catch (err) {
      error.value = 'Failed to handle redirect result'
      console.error('Redirect result error:', err)
    }
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    initializeAuth,
    login,
    logout,
    getAccessToken,
    handleRedirectResult
  }
}
