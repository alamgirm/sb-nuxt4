import { type AccountInfo, type SilentRequest, type RedirectRequest } from '@azure/msal-browser'

export const useAuth = () => {
  const { $msal, $msalConfig, $authState } = useNuxtApp()

  const login = async (loginType: 'redirect' | 'popup' = 'redirect') => {
    if (!$msal) {
      console.error('MSAL not initialized')
      return
    }

    try {
      $authState.isLoading.value = true
      $authState.error.value = null

      const loginRequest: RedirectRequest = {
        scopes: ['openid', 'profile', 'email', $msalConfig.apiScope],
        prompt: 'select_account'
      }

      if (loginType === 'redirect') {
        await $msal.loginRedirect(loginRequest)
      } else {
        const response = await $msal.loginPopup(loginRequest)
        if (response.account) {
          $authState.user.value = response.account
          $authState.isAuthenticated.value = true
        }
      }
    } catch (err: any) {
      if (err.errorCode === 'interaction_in_progress') {
        console.log('Authentication interaction already in progress')
        return
      }
      $authState.error.value = 'Login failed'
      console.error('Login error:', err)
    } finally {
      $authState.isLoading.value = false
    }
  }

  const logout = async () => {
    if (!$msal) return

    try {
      $authState.isLoading.value = true
      await $msal.logoutRedirect({
        account: $authState.user.value
      })
      $authState.user.value = null
      $authState.isAuthenticated.value = false
    } catch (err) {
      $authState.error.value = 'Logout failed'
      console.error('Logout error:', err)
    } finally {
      $authState.isLoading.value = false
    }
  }

  const getAccessToken = async (): Promise<string | null> => {
    if (!$msal || !$authState.user.value) return null

    try {
      const silentRequest: SilentRequest = {
        scopes: [$msalConfig.apiScope],
        account: $authState.user.value
      }

      const response = await $msal.acquireTokenSilent(silentRequest)
      return response.accessToken
    } catch (err) {
      console.error('Token acquisition error:', err)
      return null
    }
  }

  // Wait for initialization to complete
  const waitForInit = async (): Promise<void> => {
    if (!$msal) {
      return new Promise((resolve) => {
        const checkMsal = () => {
          if ($msal) {
            resolve()
          } else {
            setTimeout(checkMsal, 10)
          }
        }
        checkMsal()
      })
    }
  }

  return {
    user: $authState.user,
    isAuthenticated: $authState.isAuthenticated,
    isLoading: $authState.isLoading,
    error: $authState.error,
    login,
    logout,
    getAccessToken,
    waitForInit
  }
}