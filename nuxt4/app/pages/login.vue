<template>
  <LoginForm />
</template>

<script setup lang="ts">
const { isAuthenticated } = useAuth()

onMounted(async () => {
 if (isAuthenticated.value) {
  console.log('Already authenticated, redirecting to home')
  navigateTo('/')
 }
})
// This page uses the LoginForm component
</script>
