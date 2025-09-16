export const useApi = () => {
  const { getAccessToken } = useAuth()

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    try {
      const token = await getAccessToken()
      
      if (!token) {
        throw new Error('No access token available')
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }

      const response = await $fetch(url, {
        ...options,
        headers
      })

      return response
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  const callProtectedApi = async (endpoint: string, data?: any) => {
    try {
      const response = await makeAuthenticatedRequest(endpoint, {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined
      })
      return response
    } catch (error) {
      console.error('Protected API call failed:', error)
      throw error
    }
  }

  return {
    makeAuthenticatedRequest,
    callProtectedApi
  }
}
