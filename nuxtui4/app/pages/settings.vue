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
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="space-y-1">
            <button
              v-for="tab in settingsTabs"
              :key="tab.id"
              :class="[
                'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              ]"
              @click="activeTab = tab.id"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.iconPath"></path>
              </svg>
              {{ tab.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ activeTabData.name }}
            </h3>
          </div>
          <div class="p-6">

          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Application Name</label>
              <input
                v-model="settings.general.appName"
                type="text"
                placeholder="My Application"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Language</label>
              <select
                v-model="settings.general.language"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select language</option>
                <option v-for="option in languageOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
              <select
                v-model="settings.general.timezone"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select timezone</option>
                <option v-for="option in timezoneOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</label>
              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    id="email-notifications"
                    v-model="settings.general.emailNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="email-notifications" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Email notifications
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="push-notifications"
                    v-model="settings.general.pushNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="push-notifications" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Push notifications
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="sms-notifications"
                    v-model="settings.general.smsNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="sms-notifications" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    SMS notifications
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Appearance Settings -->
          <div v-if="activeTab === 'appearance'" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
              <div class="space-y-2">
                <div v-for="option in themeOptions" :key="option.value" class="flex items-center">
                  <input
                    :id="`theme-${option.value}`"
                    v-model="settings.appearance.theme"
                    :value="option.value"
                    type="radio"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                  />
                  <label :for="`theme-${option.value}`" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ option.label }}
                  </label>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sidebar</label>
              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    id="sidebar-collapsed"
                    v-model="settings.appearance.sidebarCollapsed"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="sidebar-collapsed" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Collapse sidebar by default
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="sidebar-fixed"
                    v-model="settings.appearance.sidebarFixed"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="sidebar-fixed" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Fixed sidebar
                  </label>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Color</label>
              <div class="flex space-x-2">
                <button
                  v-for="color in colorOptions"
                  :key="color.value"
                  :class="[
                    'px-3 py-1 text-sm font-medium rounded-md border transition-colors duration-200',
                    settings.appearance.primaryColor === color.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  ]"
                  @click="settings.appearance.primaryColor = color.value"
                >
                  {{ color.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</label>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Enable 2FA</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <button
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    settings.security.twoFactor ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                  @click="settings.security.twoFactor = !settings.security.twoFactor"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      settings.security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                    ]"
                  />
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Session Timeout</label>
              <select
                v-model="settings.security.sessionTimeout"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select timeout</option>
                <option v-for="option in sessionTimeoutOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password Requirements</label>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    id="require-uppercase"
                    v-model="settings.security.requireUppercase"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="require-uppercase" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Require uppercase letters
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="require-numbers"
                    v-model="settings.security.requireNumbers"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="require-numbers" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Require numbers
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="require-symbols"
                    v-model="settings.security.requireSymbols"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label for="require-symbols" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Require special characters
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-end">
              <button
                @click="saveSettings"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page title
useHead({
  title: 'Settings'
})

const activeTab = ref('general')

const settingsTabs = [
  { id: 'general', name: 'General', iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { id: 'appearance', name: 'Appearance', iconPath: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z' },
  { id: 'security', name: 'Security', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 14.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
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
