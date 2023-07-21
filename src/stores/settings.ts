import { WEATHER_SETTINGS_LANG_KEY } from "@/constants/local-storage-keys";
import i18n from "@/locales/i18n";
import { defineStore } from "pinia";
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore('settingsStore', () => {
  const selectedLang = ref('en');

  if (window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY)) {
    selectedLang.value = JSON.parse(window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY) || 'en');
  }

  watch(selectedLang, (newValue) => {
    window.localStorage.setItem(WEATHER_SETTINGS_LANG_KEY, JSON.stringify(newValue));
    
    i18n.global.locale = newValue;
  });

  return {
    selectedLang,
  }
});
