export default defineEventHandler(async (event) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Nuxt 4 MSAL Sample API is running'
  }
})
