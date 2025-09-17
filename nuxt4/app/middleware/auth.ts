export default defineNuxtRouteMiddleware((to) => {
  // Simple middleware without useAuth to prevent loops
  // Authentication state will be handled by the composable in components
  
  // For now, allow all routes - authentication will be handled in components
  // TODO: Implement proper auth checking once the composable is stable
  console.log('Auth middleware running for:', to.path)
})
