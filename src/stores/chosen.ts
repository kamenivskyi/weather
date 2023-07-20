import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export interface ChosenCity {
  id: number;
  lat: number;
  lon: number;
  // label: string;
}

// need to use pinia-plugin-persistedstate
export const useChosenStore = defineStore('chosenStore', () => {
  const data = ref({
    chosenCities: [] as ChosenCity[],
  });

  const addChosenCity = (city: ChosenCity) => {
    if (!isCityChosen(city)) {
      data.value.chosenCities.push(city);
    }
  };

  const removeChosenCity = (id: number) => {
    const index = data.value.chosenCities.findIndex((city) => city.id === id);
    if (index !== -1) {
      data.value.chosenCities.splice(index, 1);
    }
  };

  const isCityChosen = (city: ChosenCity) => {
    return data.value.chosenCities.some((chosenCity) => chosenCity.id === city.id);
  };

  const chosenCities = computed(() => data.value.chosenCities);

  return {
    addChosenCity,
    removeChosenCity,
    chosenCities,
  }
},
{ 
  persist: true
}
);
  