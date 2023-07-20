<template>
  <div class="chosen">
    <div class="container">
      <h1>Chosen page</h1>
    </div>
    <template v-if="hasChosenCities">
      <!-- <ChosenWeatherCard v-for="city in chosenCities" :key="city.id" :city="city" /> -->
      <!-- <div v-for="item in data">
        {{ item.lat }}
        {{ item.lon }}
      </div> -->
      <div class="c-slider">
        <ChosenWeatherCard
          v-for="item in data" 
          :currentWeather="item.current" 
          :forecastWeather="item.forecast" 
          :key="item.id" 
          @remove="() => { console.log('removeW@@')}"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import ChosenWeatherCard from '@/components/chosen-weather-card/chosen-weather-card.vue';
import WeatherCard from '@/components/weather-card/weather-card.vue';
import { apiService } from '@/services/api-service';
import { useChosenStore } from '@/stores/chosen';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';

const chosenStore = useChosenStore();
const data = ref<any[]>([]);
const currentCityIdx = ref(-1);
const currentCity = ref<any>(null);
const chosenCities = ref<any>([]);

const cities = computed(() => chosenStore.chosenCities);
const hasChosenCities = computed(() => cities.value.length > 0);

let timeout;

onMounted(() => {
  // if (hasChosenCities.value) {
    // console.log('chosenStore: ', chosenStore.chosenCities);
    chosenCities.value = cities.value;
    // console.log('MOUNTED cities: ', cities.value);
    loadWeatherData();
  // }
});

onUnmounted(() => {
  if (timeout) {
    clearInterval(timeout);
  }
})

watchEffect(() => {
  // console.log('effect watch: ');
  if (currentCityIdx.value >= 0) {
    loadWeatherData();
  }
})

async function loadWeatherData() {
  
  if (currentCityIdx.value >= cities.value.length) {
    return;
  }
  // console.log('cities.value', cities.value)
  
  currentCity.value = chosenCities.value[currentCityIdx.value];
  
  // Завантажте погодові дані для поточного міста
  // Наприклад, викликайте apiService для завантаження даних
  if (currentCity.value) {
    const [current, forecast] = await apiService.getWeather(currentCity.value.lat, currentCity.value.lon);
  
    console.log('weatherData current: ', current);
    console.log('weatherData: forecast', forecast);
    data.value.push({
      current: current,
      forecast: forecast,
    });
  }
  
  // Обробка отриманих даних, наприклад, збережіть їх у змінній

  // Збільште currentCityIndex для завантаження наступного міста через 3 секунди
  timeout = setTimeout(() => {
    currentCityIdx.value++;
  }, 3000);
};

</script>

<style></style>
