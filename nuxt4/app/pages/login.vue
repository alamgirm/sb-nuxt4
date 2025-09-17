<template>
  <LoginForm />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const { isAuthenticated, waitForInit } = useAuth()

// Wait for initialization to complete, then check auth status
onMounted(async () => {
  console.log('Login page mounted, waiting for auth initialization...')
  await waitForInit()
  
  if (isAuthenticated.value) {
    console.log('Already authenticated, redirecting to home')
    navigateTo('/')
  } else {
    console.log('Not authenticated, staying on login page')
  }
})
</script>
