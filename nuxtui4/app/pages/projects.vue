<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Projects
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Manage your projects and track progress
      </p>
    </div>

    <!-- Projects Content -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Your Projects</h3>
      </template>
      
      <div class="text-center py-12">
        <UIcon name="i-heroicons-folder" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Get started by creating your first project</p>
        <UButton color="primary" size="lg">
          Create Project
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Projects'
})

// Set route meta for header
definePageMeta({
  title: 'Projects'
})
</script>
