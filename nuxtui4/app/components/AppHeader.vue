<template>
  <header class="header">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left side - Logo and breadcrumb -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: #003478;">
            <UIcon name="i-heroicons-cube" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">EATM</span>
        </div>
        
        <div class="hidden md:block">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ pageTitle }}
          </h1>
        </div>
      </div>

      <!-- Right side - Theme toggle and user menu -->
      <div class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <UButton
          :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          variant="ghost"
          size="sm"
          @click="toggleTheme"
        />
        
        <!-- Notifications -->
        <UButton
          icon="i-heroicons-bell"
          variant="ghost"
          size="sm"
          :badge="notificationCount > 0 ? notificationCount : undefined"
          @click="() => console.log('Notifications clicked')"
        />

        <!-- User Menu -->
        <UDropdownMenu :items="userMenuItems">
          <UButton variant="ghost" size="sm">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="User"
              size="sm"
            />
          </UButton>
        </UDropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header component - no sidebar toggling needed

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const route = useRoute()
const pageTitle = computed(() => {
  const title = route.meta?.title as string
  return title || 'Dashboard'
})

const notificationCount = ref(3)

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
