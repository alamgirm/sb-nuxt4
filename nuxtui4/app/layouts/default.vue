<template>
  <div class="layout-container">
    <!-- Sidebar -->
    <AppSidebar :is-open="sidebarOpen" @toggle="toggleSidebar" />
    
    <!-- Header -->
    <AppHeader :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    
    <!-- Main Content -->
    <main :class="['main-content', { 'sidebar-closed': !sidebarOpen }]">
      <div class="content-area">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const { sidebarOpen, toggleSidebar } = storeToRefs(themeStore)
</script>
