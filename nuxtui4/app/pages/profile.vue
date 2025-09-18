<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Profile
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Manage your personal information and preferences
      </p>
    </div>

    <!-- Profile Content -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
      </template>
      
      <div class="text-center py-12">
        <UIcon name="i-heroicons-user" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Profile settings</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Update your personal information and preferences</p>
        <UButton color="primary" size="lg">
          Edit Profile
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Profile'
})

// Set route meta for header
definePageMeta({
  title: 'Profile'
})
</script>
