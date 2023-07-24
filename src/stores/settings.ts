import { WEATHER_SETTINGS_LANG_KEY, WEATHER_SETTINGS_THEME_KEY } from "@/constants/local-storage-keys";
import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useSettingsStore = defineStore('settingsStore', () => {
  const { locale } = useI18n();
  const selectedLang = ref<'en' | 'ua'>('en');
  const selectedTheme = ref<'light' | 'dark'>('light');
  const isDarkTheme = computed(() => selectedTheme.value === 'dark');

  const savedLang = window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY);
  if (savedLang !== null) {
    selectedLang.value = JSON.parse(savedLang);
  }

  const savedTheme = window.localStorage.getItem(WEATHER_SETTINGS_THEME_KEY);

  if (savedTheme !== null) {
    selectedTheme.value = JSON.parse(savedTheme);
  }

  watch(selectedLang, (newValue) => {
    window.localStorage.setItem(WEATHER_SETTINGS_LANG_KEY, JSON.stringify(newValue));
    
    locale.value = newValue;
  });

  watch(selectedTheme, (newValue) => {
    window.localStorage.setItem(WEATHER_SETTINGS_THEME_KEY, JSON.stringify(newValue));
  });

  const toggleTheme = () => selectedTheme.value = isDarkTheme.value ? 'light' : 'dark';

  
  return {
    selectedLang,
    selectedTheme,
    isDarkTheme,
    toggleTheme,
  }
});
