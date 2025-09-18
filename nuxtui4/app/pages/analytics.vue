<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Analytics
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        View your application analytics and insights
      </p>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            12,345
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Page Views</div>
          <div class="text-xs text-green-600 dark:text-green-400 mt-1">
            +12% from last month
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            8,901
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Unique Visitors</div>
          <div class="text-xs text-green-600 dark:text-green-400 mt-1">
            +8% from last month
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            72%
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</div>
          <div class="text-xs text-red-600 dark:text-red-400 mt-1">
            -2% from last month
          </div>
        </div>
      </UCard>
    </div>

    <!-- Chart Placeholder -->
    <UCard class="mb-8">
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Traffic Overview</h3>
      </template>
      
      <div class="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div class="text-center">
          <UIcon name="i-heroicons-chart-bar" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p class="text-gray-500 dark:text-gray-400">Chart would be rendered here</p>
        </div>
      </div>
    </UCard>

    <!-- Top Pages Table -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Top Pages</h3>
      </template>
      
      <UTable :rows="topPages" :columns="columns">
        <template #page-data="{ row }">
          <div class="flex items-center space-x-2">
            <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-gray-400" />
            <span>{{ row.page }}</span>
          </div>
        </template>
        
        <template #views-data="{ row }">
          <UBadge :label="row.views.toLocaleString()" color="blue" />
        </template>
        
        <template #bounce-rate-data="{ row }">
          <span :class="row.bounceRate > 50 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">
            {{ row.bounceRate }}%
          </span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Analytics'
})

// Set route meta for header
definePageMeta({
  title: 'Analytics'
})

const columns = [
  { key: 'page', label: 'Page', id: 'page' },
  { key: 'views', label: 'Views', id: 'views' },
  { key: 'bounceRate', label: 'Bounce Rate', id: 'bounceRate' }
]

const topPages = [
  { page: '/dashboard', views: 2345, bounceRate: 32 },
  { page: '/analytics', views: 1890, bounceRate: 28 },
  { page: '/projects', views: 1567, bounceRate: 45 },
  { page: '/settings', views: 1234, bounceRate: 38 },
  { page: '/profile', views: 987, bounceRate: 52 }
]
</script>
