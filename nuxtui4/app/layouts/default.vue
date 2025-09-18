<template>
  <div class="layout-container">
    <!-- Nuxt Loading Indicator -->
    <NuxtLoadingIndicator color="#003478" :height="3" />

    <!-- Header - Full width at top -->
    <AppHeader />

    <!-- Main Layout - Below header -->
    <div class="main-layout">
      <!-- Sidebar - Left side -->
      <AppSidebar />

      <!-- Main Content - Right side -->
      <main class="main-content">
        <div class="content-area">
          <slot />
        </div>
        
        <!-- Footer - Inside main content but below sidebar -->
        <AppFooter />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout component - no sidebar toggling needed
</script>
