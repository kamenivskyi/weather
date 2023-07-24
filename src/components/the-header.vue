<template>
  <header class="o-header">
    <div class="container">
      <div class="o-header__inner">
        <a href="#" class="o-header__logo">{{ t("logo") }}</a>
        <div class="u-row u-align-items-center">
          <select v-model="settings.selectedLang" class="o-header__select" name="select">
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </select>
          <AppButton @click="settings.toggleTheme()">
            {{ settings.isDarkTheme ? t('darkMode.off') : t('darkMode.on') }}
          </AppButton>
        </div>
      </div>
    </div>
  </header>
</template>
  
<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { useI18n } from 'vue-i18n';
import AppButton from '@/components/app-button.vue';
const settings = useSettingsStore();

const { t } = useI18n();
</script>
