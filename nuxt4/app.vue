<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Initialize auth on app start
const { initializeAuth, handleRedirectResult } = useAuth()

onMounted(async () => {
  await initializeAuth()
  await handleRedirectResult()
})
</script>
