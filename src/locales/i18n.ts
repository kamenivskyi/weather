import { createI18n } from 'vue-i18n';
import { messages } from '@/locales';
import { useSettingsStore } from '@/stores/settings';
import { WEATHER_SETTINGS_LANG_KEY } from '@/constants/local-storage-keys';

  const i18n = createI18n({
    legasy: false,
    locale: window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY) 
      ? JSON.parse(window.localStorage.getItem(WEATHER_SETTINGS_LANG_KEY) || 'en') 
      : 'en', // set locale
    fallbackLocale: 'ua', // set fallback locale
    messages,
  });

export default i18n;
