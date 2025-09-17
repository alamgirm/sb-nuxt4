import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const sidebarOpen = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    // Update the color mode
    const colorMode = useColorMode()
    colorMode.preference = isDark.value ? 'dark' : 'light'
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setSidebarOpen = (open: boolean) => {
    sidebarOpen.value = open
  }

  // Initialize theme from system preference
  const initTheme = () => {
    const colorMode = useColorMode()
    isDark.value = colorMode.value === 'dark'
  }

  return {
    isDark: readonly(isDark),
    sidebarOpen: readonly(sidebarOpen),
    toggleTheme,
    toggleSidebar,
    setSidebarOpen,
    initTheme
  }
})
