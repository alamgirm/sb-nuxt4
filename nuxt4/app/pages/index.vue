<template>
  <AppLayout>
    <div class="px-4 py-6 sm:px-0">
      <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          Welcome to Nuxt 4 MSAL Sample
        </h1>
        
        <div class="space-y-4">
          <p class="text-lg text-gray-600">
            This is a sample application demonstrating Microsoft Authentication Library (MSAL) integration with Nuxt 4.
          </p>
          
          <div v-if="isAuthenticated" class="bg-green-50 border border-green-200 rounded-md p-4">
            <h2 class="text-lg font-medium text-green-800 mb-2">Authentication Status</h2>
            <p class="text-green-700">You are successfully authenticated!</p>
            <div class="mt-2">
              <NuxtLink
                to="/protected"
                class="text-green-600 hover:text-green-500 font-medium"
              >
                Go to Protected Page →
              </NuxtLink>
            </div>
          </div>
          
          <div v-else class="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h2 class="text-lg font-medium text-blue-800 mb-2">Get Started</h2>
            <p class="text-blue-700 mb-4">Please log in to access protected features.</p>
            <NuxtLink
              to="/login"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Login with Microsoft
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>
