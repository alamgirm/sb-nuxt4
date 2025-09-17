<template>
  <header :class="['header', { 'sidebar-closed': !sidebarOpen }]">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left side - Menu toggle and breadcrumb -->
      <div class="flex items-center space-x-4">
        <button
          class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="$emit('toggle-sidebar')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <div class="hidden md:block">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ pageTitle }}
          </h1>
        </div>
      </div>

      <!-- Right side - Theme toggle and user menu -->
      <div class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <button
          class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="toggleTheme"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
        
        <!-- Notifications -->
        <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5 5-5h-5m-6 0H4l5 5-5 5h5"></path>
          </svg>
          <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ notificationCount }}
          </span>
        </button>

        <!-- User Menu -->
        <div class="flex items-center space-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="User"
            class="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  sidebarOpen: boolean
}

interface Emits {
  (e: 'toggle-sidebar'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const themeStore = useThemeStore()
const { isDark, toggleTheme } = storeToRefs(themeStore)

const route = useRoute()
const pageTitle = computed(() => {
  const title = route.meta?.title as string
  return title || 'Dashboard'
})

const notificationCount = ref(3)

const notificationItems = [
  [{
    label: 'New message from John',
    description: 'Hey, how are you doing?',
    icon: 'i-heroicons-chat-bubble-left-right'
  }],
  [{
    label: 'System update',
    description: 'Your system has been updated',
    icon: 'i-heroicons-cog-6-tooth'
  }],
  [{
    label: 'View all notifications',
    icon: 'i-heroicons-eye'
  }]
]

const userMenuItems = [
  [{
    label: 'Profile',
    icon: 'i-heroicons-user',
    click: () => navigateTo('/profile')
  }],
  [{
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    click: () => navigateTo('/settings')
  }],
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: () => console.log('Sign out')
  }]
]
</script>
