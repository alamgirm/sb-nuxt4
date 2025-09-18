<template>
  <aside class="sidebar">
    <div class="flex flex-col h-full">
      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <div v-for="section in navigationSections" :key="section.title" class="mb-6">
          <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {{ section.title }}
          </h3>
          <div class="space-y-1">
            <UButton
              v-for="item in section.items"
              :key="item.name"
              :to="item.href"
              :variant="isActive(item.href) ? 'solid' : 'ghost'"
              :color="isActive(item.href) ? 'primary' : 'gray'"
              :icon="item.icon"
              class="w-full justify-start"
            >
              {{ item.name }}
              <UBadge
                v-if="item.badge"
                :label="item.badge"
                size="xs"
                class="ml-auto"
              />
            </UButton>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Sidebar component - always visible, no toggling needed

const route = useRoute()

const isActive = (href: string) => {
  return route.path === href || route.path.startsWith(href + '/')
}

const navigationSections = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', href: '/', icon: 'i-heroicons-home' },
      { name: 'Analytics', href: '/analytics', icon: 'i-heroicons-chart-bar' },
      { name: 'Projects', href: '/projects', icon: 'i-heroicons-folder' },
      { name: 'Tasks', href: '/tasks', icon: 'i-heroicons-check-circle', badge: '5' },
    ]
  },
  {
    title: 'Communication',
    items: [
      { name: 'Messages', href: '/messages', icon: 'i-heroicons-chat-bubble-left-right' },
      { name: 'Calendar', href: '/calendar', icon: 'i-heroicons-calendar' },
      { name: 'Team', href: '/team', icon: 'i-heroicons-users' },
    ]
  },
  {
    title: 'Settings',
    items: [
      { name: 'Profile', href: '/profile', icon: 'i-heroicons-user' },
      { name: 'Settings', href: '/settings', icon: 'i-heroicons-cog-6-tooth' },
      { name: 'Help', href: '/help', icon: 'i-heroicons-question-mark-circle' },
    ]
  }
]
</script>
