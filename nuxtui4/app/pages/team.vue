<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Team
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Manage your team members and collaboration
      </p>
    </div>

    <!-- Team Content -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
      </template>
      
      <div class="text-center py-12">
        <UIcon name="i-heroicons-users" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Team management</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Invite team members and manage permissions</p>
        <UButton color="primary" size="lg">
          Invite Member
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Team'
})

// Set route meta for header
definePageMeta({
  title: 'Team'
})
</script>
