// Simplified plugin - MSAL initialization is now handled in the composable
export default defineNuxtPlugin(() => {
  return {
    provide: {
      msal: null
    }
  }
})
