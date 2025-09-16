import type { AccountInfo } from '@azure/msal-browser'

export const formatUserName = (user: AccountInfo | null): string => {
  if (!user) return 'Unknown User'
  return user.name || user.username || 'Unknown User'
}

export const isTokenExpired = (expiresOn: string | null): boolean => {
  if (!expiresOn) return true
  return new Date(expiresOn) <= new Date()
}

export const getTokenExpirationTime = (expiresOn: string | null): number => {
  if (!expiresOn) return 0
  return new Date(expiresOn).getTime()
}
