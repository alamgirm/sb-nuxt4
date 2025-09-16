<template>
  <AppLayout>
    <div class="px-4 py-6 sm:px-0">
      <div class="bg-white shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Protected Page</h1>
        
        <div class="space-y-6">
          <div class="bg-gray-50 rounded-md p-4">
            <h2 class="text-lg font-medium text-gray-900 mb-2">User Information</h2>
            <div v-if="user" class="space-y-2">
              <p><strong>Name:</strong> {{ user.name }}</p>
              <p><strong>Email:</strong> {{ user.username }}</p>
              <p><strong>Tenant ID:</strong> {{ user.tenantId }}</p>
            </div>
          </div>
          
          <ApiTest />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth()
</script>
