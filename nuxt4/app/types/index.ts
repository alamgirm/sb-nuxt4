export interface User {
  name?: string
  username?: string
  tenantId?: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}

export interface MsalConfig {
  clientId: string
  authority: string
  redirectUri: string
  apiScope: string
}
