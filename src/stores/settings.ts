import { WEATHER_SETTINGS_LANG_KEY } from "@/constants/local-storage-keys";
import { defineStore } from "pinia";
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export const useSettingsStore = defineStore('settingsStore', () => {
  const { locale } = useI18n();
  const selectedLang = ref('en');

  if (window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY)) {
    selectedLang.value = JSON.parse(window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY) || 'en');
  }

  watch(selectedLang, (newValue) => {
    window.localStorage.setItem(WEATHER_SETTINGS_LANG_KEY, JSON.stringify(newValue));
    
    locale.value = newValue;
  });

  return {
    selectedLang,
  }
});
