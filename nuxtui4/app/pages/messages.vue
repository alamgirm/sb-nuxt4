<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Messages
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Stay connected with your team
      </p>
    </div>

    <!-- Messages Content -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
      </template>
      
      <div class="text-center py-12">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No messages yet</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Start a conversation with your team</p>
        <UButton color="primary" size="lg">
          New Message
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Messages'
})

// Set route meta for header
definePageMeta({
  title: 'Messages'
})
</script>
