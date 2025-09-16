<template>
  <div class="bg-gray-50 rounded-md p-4">
    <h2 class="text-lg font-medium text-gray-900 mb-2">API Test</h2>
    <p class="text-gray-600 mb-4">
      Test making an authenticated API call with your custom scope.
    </p>
    <button
      @click="testApiCall"
      :disabled="isApiLoading"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isApiLoading ? 'Testing...' : 'Test API Call' }}
    </button>
    
    <div v-if="apiResponse" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
      <h3 class="font-medium text-green-800 mb-2">API Response:</h3>
      <pre class="text-sm text-green-700 whitespace-pre-wrap">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
    
    <div v-if="apiError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <h3 class="font-medium text-red-800 mb-2">API Error:</h3>
      <p class="text-sm text-red-700">{{ apiError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { callProtectedApi } = useApi()

const isApiLoading = ref(false)
const apiResponse = ref(null)
const apiError = ref<string | null>(null)

const testApiCall = async () => {
  try {
    isApiLoading.value = true
    apiError.value = null
    apiResponse.value = null
    
    // Call Spring Boot /me endpoint
    const response = await callProtectedApi('http://localhost:8080/api/users/me')
    apiResponse.value = response
  } catch (error: any) {
    apiError.value = error.message || 'API call failed'
  } finally {
    isApiLoading.value = false
  }
}
</script>
