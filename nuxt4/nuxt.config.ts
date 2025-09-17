export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint'
  ],
  srcDir: 'app/',
  runtimeConfig: {
    public: {
      msal: {
        clientId: process.env.NUXT_PUBLIC_MSAL_CLIENT_ID || '',
        authority: process.env.NUXT_PUBLIC_MSAL_AUTHORITY || 'https://login.microsoftonline.com/common',
        redirectUri: process.env.NUXT_PUBLIC_MSAL_REDIRECT_URI || 'http://localhost:3000',
        apiScope: process.env.NUXT_PUBLIC_MSAL_API_SCOPE || 'api://your-api-client-id/access_as_user'
      }
    }
  },
  typescript: {
    strict: true
  }
})
