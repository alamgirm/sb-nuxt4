import { useAuth } from "../composables/useAuth"

export default defineNuxtRouteMiddleware((to) => {

  const { isAuthenticated } = useAuth()

  // Redirect to login if not authenticated and trying to access protected route
  if (to.path.startsWith('/protected') && !isAuthenticated.value) {
    console.log('Redirecting to login in middleware')
    return navigateTo('/login')
  }
  console.log('Auth middleware running for:', to.path)
})
