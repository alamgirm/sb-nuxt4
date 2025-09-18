<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Help & Support
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Get help and find answers to your questions
      </p>
    </div>

    <!-- Help Content -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Help Center</h3>
      </template>
      
      <div class="text-center py-12">
        <UIcon name="i-heroicons-question-mark-circle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Need help?</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Find answers to common questions and get support</p>
        <UButton color="primary" size="lg">
          Contact Support
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Help & Support'
})

// Set route meta for header
definePageMeta({
  title: 'Help & Support'
})
</script>
