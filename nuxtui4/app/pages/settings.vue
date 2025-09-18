<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Settings
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Manage your application settings and preferences
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Settings Navigation -->
      <div class="lg:col-span-1">
        <UCard>
          <div class="space-y-1">
            <UButton
              v-for="tab in settingsTabs"
              :key="tab.id"
              :variant="activeTab === tab.id ? 'solid' : 'ghost'"
              :color="activeTab === tab.id ? 'primary' : 'gray'"
              :icon="tab.icon"
              class="w-full justify-start"
              @click="activeTab = tab.id"
            >
              {{ tab.name }}
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ activeTabData.name }}
            </h3>
          </template>

          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="space-y-6">
            <UFormField label="Application Name">
              <UInput v-model="settings.general.appName" placeholder="My Application" />
            </UFormField>

            <UFormField label="Default Language">
              <USelect
                v-model="settings.general.language"
                :options="languageOptions"
                placeholder="Select language"
              />
            </UFormField>

            <UFormField label="Timezone">
              <USelect
                v-model="settings.general.timezone"
                :options="timezoneOptions"
                placeholder="Select timezone"
              />
            </UFormField>

            <UFormField label="Notifications">
              <div class="space-y-3">
                <UCheckbox v-model="settings.general.emailNotifications" label="Email notifications" />
                <UCheckbox v-model="settings.general.pushNotifications" label="Push notifications" />
                <UCheckbox v-model="settings.general.smsNotifications" label="SMS notifications" />
              </div>
            </UFormField>
          </div>

          <!-- Appearance Settings -->
          <div v-if="activeTab === 'appearance'" class="space-y-6">
            <UFormField label="Theme">
              <URadioGroup v-model="settings.appearance.theme" :options="themeOptions" />
            </UFormField>

            <UFormField label="Sidebar">
              <div class="space-y-3">
                <UCheckbox v-model="settings.appearance.sidebarCollapsed" label="Collapse sidebar by default" />
                <UCheckbox v-model="settings.appearance.sidebarFixed" label="Fixed sidebar" />
              </div>
            </UFormField>

            <UFormField label="Primary Color">
              <div class="flex space-x-2">
                <UButton
                  v-for="color in colorOptions"
                  :key="color.value"
                  :variant="settings.appearance.primaryColor === color.value ? 'solid' : 'outline'"
                  :color="color.value"
                  size="sm"
                  @click="settings.appearance.primaryColor = color.value"
                >
                  {{ color.label }}
                </UButton>
              </div>
            </UFormField>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="space-y-6">
            <UFormField label="Two-Factor Authentication">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Enable 2FA</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <USwitch v-model="settings.security.twoFactor" />
              </div>
            </UFormField>

            <UFormField label="Session Timeout">
              <USelect
                v-model="settings.security.sessionTimeout"
                :options="sessionTimeoutOptions"
                placeholder="Select timeout"
              />
            </UFormField>

            <UFormField label="Password Requirements">
              <div class="space-y-2">
                <UCheckbox v-model="settings.security.requireUppercase" label="Require uppercase letters" />
                <UCheckbox v-model="settings.security.requireNumbers" label="Require numbers" />
                <UCheckbox v-model="settings.security.requireSymbols" label="Require special characters" />
              </div>
            </UFormField>
          </div>

          <template #footer>
            <div class="flex justify-end">
              <UButton @click="saveSettings">
                Save Changes
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Settings'
})

// Set route meta for header
definePageMeta({
  title: 'Settings'
})

const activeTab = ref('general')

const settingsTabs = [
  { id: 'general', name: 'General', icon: 'i-heroicons-cog-6-tooth' },
  { id: 'appearance', name: 'Appearance', icon: 'i-heroicons-paint-brush' },
  { id: 'security', name: 'Security', icon: 'i-heroicons-shield-check' }
]

const activeTabData = computed(() => 
  settingsTabs.find(tab => tab.id === activeTab.value) || settingsTabs[0]
)

const settings = ref({
  general: {
    appName: 'NuxtUI Dashboard',
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false
  },
  appearance: {
    theme: 'system',
    sidebarCollapsed: false,
    sidebarFixed: true,
    primaryColor: 'blue'
  },
  security: {
    twoFactor: false,
    sessionTimeout: '30',
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: false
  }
})

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' }
]

const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'EST', value: 'EST' },
  { label: 'PST', value: 'PST' },
  { label: 'CET', value: 'CET' }
]

const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' }
]

const colorOptions = [
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Purple', value: 'purple' },
  { label: 'Red', value: 'red' },
  { label: 'Yellow', value: 'yellow' }
]

const sessionTimeoutOptions = [
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '1 hour', value: '60' },
  { label: '2 hours', value: '120' }
]

const saveSettings = () => {
  // Here you would typically save to a backend
  console.log('Saving settings:', settings.value)
  // Show success message
  const toast = useToast()
  toast.add({
    title: 'Settings saved',
    description: 'Your settings have been saved successfully.',
    color: 'green'
  })
}
</script>
