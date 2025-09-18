<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Developed by GitHub Team, part of DevTools and Enablement. Copyright © 2025 Gord Fotor Company.
        </p>
      </div>
      <div class="footer-right">
        <div class="flex items-center space-x-4">
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-question-mark-circle"
            @click="() => console.log('Help clicked')"
          >
            Help
          </UButton>
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-document-text"
            @click="() => console.log('Documentation clicked')"
          >
            Docs
          </UButton>
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-cog-6-tooth"
            @click="() => navigateTo('/settings')"
          >
            Settings
          </UButton>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component for the bottom of the page
</script>

<style scoped>
.footer {
  background-color: white;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  margin-top: auto;
}

.dark .footer {
  background-color: #1f2937;
  border-top-color: #374151;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.footer-left {
  flex: 1;
}

.footer-right {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-right {
    order: -1;
  }
}
</style>
