export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, initializeAuth } = useAuth()

  // Initialize auth on first load
  if (process.client) {
    initializeAuth()
  }

  // Redirect to login if not authenticated and trying to access protected route
  if (to.path.startsWith('/protected') && !isAuthenticated.value) {
    return navigateTo('/login')
  }
})
