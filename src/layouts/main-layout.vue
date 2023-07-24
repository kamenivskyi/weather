<template>
  <div :class="{ 
    'light': !settings.isDarkTheme,
    'dark': settings.isDarkTheme 
  }">
    <TheHeader />
    <div class="container">
      <nav class="m-tabs">
        <RouterLink to="/" class="m-tabs__item">{{ t('pageTabs.main') }}</RouterLink>
        <RouterLink to="/chosen" class="m-tabs__item">{{ t('pageTabs.chosen') }}</RouterLink>
      </nav>
    </div>
    <main class="main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/the-header.vue';
import TheFooter from '@/components/the-footer.vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settings';

const { t } = useI18n();

const settings = useSettingsStore();
</script>
