<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Dashboard
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Welcome to your NuxtUI dashboard with sidebar and theme switching
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <UIcon name="i-heroicons-users" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">2,345</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">$45,678</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <UIcon name="i-heroicons-heart" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Likes</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">8,901</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </template>
        
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-3">
            <UAvatar :src="activity.avatar" size="sm" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ activity.user }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ activity.action }}
              </p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ activity.time }}
            </span>
          </div>
        </div>
      </UCard>

      <!-- Quick Actions -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
        </template>
        
        <div class="grid grid-cols-2 gap-4">
          <UButton
            v-for="action in quickActions"
            :key="action.name"
            :icon="action.icon"
            variant="outline"
            size="lg"
            class="h-20 flex-col"
            @click="action.click"
          >
            {{ action.name }}
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Dashboard'
})

// Set route meta for header
definePageMeta({
  title: 'Dashboard'
})

const recentActivities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created a new project',
    time: '2m ago',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated user profile',
    time: '5m ago',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Completed task',
    time: '1h ago',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    action: 'Added new team member',
    time: '2h ago',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4'
  }
]

const quickActions = [
  {
    name: 'New Project',
    icon: 'i-heroicons-plus',
    click: () => console.log('New Project clicked')
  },
  {
    name: 'Add User',
    icon: 'i-heroicons-user-plus',
    click: () => console.log('Add User clicked')
  },
  {
    name: 'Send Message',
    icon: 'i-heroicons-chat-bubble-left-right',
    click: () => console.log('Send Message clicked')
  },
  {
    name: 'View Reports',
    icon: 'i-heroicons-chart-bar',
    click: () => console.log('View Reports clicked')
  }
]
</script>
