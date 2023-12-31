import type { ForecastDay, WeatherCurrent } from '@/models';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export interface ChosenCity {
  id: number;
  lat: number;
  lon: number;
  current: WeatherCurrent | null;
  forecast: ForecastDay[][] | null;
}

const CHOSEN_LOCAL_STORAGE_KEY = 'weatherAppChosen';

export const useChosenStore = defineStore('chosenStore', () => {
  const data = ref({
    chosenCities: [] as ChosenCity[]
  });

  if (window.localStorage.getItem(CHOSEN_LOCAL_STORAGE_KEY)) {
    data.value = JSON.parse(window.localStorage.getItem(CHOSEN_LOCAL_STORAGE_KEY) || '');
  }

  watch(
    data,
    (newData) => {
      window.localStorage.setItem(CHOSEN_LOCAL_STORAGE_KEY, JSON.stringify(newData));
    },
    { deep: true }
  );

  const addChosenCity = (city: ChosenCity) => {
    console.log('chose: ', city);
    if (city.current?.id && !isCityChosen(city.current?.id)) {
      data.value.chosenCities.push(city);
    }
  };

  const removeChosenCity = (id: number) => {
    const index = data.value.chosenCities.findIndex((city) => city.current?.id === id);
    if (index !== -1) {
      data.value.chosenCities.splice(index, 1);
    }
  };

  const isCityChosen = (id: number) => {
    return data.value.chosenCities.some((chosenCity) => chosenCity.current?.id === id);
  };

  const chosenCities = computed(() => data.value.chosenCities);

  return {
    addChosenCity,
    removeChosenCity,
    isCityChosen,
    chosenCities
  };
});
