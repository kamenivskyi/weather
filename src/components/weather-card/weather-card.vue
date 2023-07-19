<template>
  <div class="c-weather-card">
    <div class="c-weather-card__header">
      <div class="c-weather-card__search-panel">
        <input v-model="value" class="c-input" type="search" placeholder="Search" />
        
        <AppSpinner v-if="isSearching" />
        
        <template v-else-if="emptyCities">Not found</template>

        <div v-else-if="isDropdownOpened" class="c-weather-card__dropdown">
          <AppButton 
            v-for="item in cities" 
            class="c-weather-card__dropdown-item" 
            @click="handleCityClick(item.lat, item.lon)"
          >
            {{ item.label }}
          </AppButton>
        </div>
      </div>
      <AppButton variant="primary" pill>Add to chosen</AppButton>
    </div>
    <div class="c-weather-card__tabs">
      <AppButton 
        @click="handleRegimeClick('day')" 
        :class="{ 
          'u-bg--primary': selectedRegime === 'day', 
        }"
      >
        Day
      </AppButton>
      <AppButton 
        @click="handleRegimeClick('week')" 
        :class="{ 
          'u-bg--primary': selectedRegime === 'week', 
        }"
      >
        Week
      </AppButton>
    </div>
    
    <AppSpinner v-if="isWeatherLoading" />

    <template v-else>
      <WeatherCardDataCurrent v-if="selectedRegime === 'day'" :data="currentWeather" />
      <WeatherCardDataForecast v-else-if="selectedRegime === 'week'" :data="forecastWeather" />
    </template>
    <WeatherCardChart />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppButton from '@/components/app-button.vue';
import AppSpinner from '@/components/app-spinner.vue';
import WeatherCardData from '@/components/weather-card/weather-card-data.vue';
import WeatherCardChart from '@/components/weather-card/weather-card-chart.vue';
import debounce from 'lodash.debounce';
import { apiService } from '@/services/api-service';
import type { DropdownCity, ForecastDay, WeatherCurrent } from '@/models';
import WeatherCardDataForecast from './weather-card-data-forecast.vue';
import WeatherCardDataCurrent from './weather-card-data-current.vue';

interface SelectedCity {
  lat: number 
  lon: number
};

const value = ref('');
const selectedRegime = ref<'day' | 'week'>('day');
const isDropdownOpened = ref(false);
const cities = ref<DropdownCity[] | null>(null);
const isSearching = ref(false);
const isWeatherLoading = ref(false);
const emptyCities = ref(false);
const selectedCity = ref<SelectedCity | null>(null);
const currentWeather = ref<WeatherCurrent | null>(null);
const forecastWeather = ref<ForecastDay[][] | null>(null);
// const errors = ref(null);

watch(value, (newVal: string) => {
  if (newVal.trim()) {
    debounceValueChange(newVal);
  }

  if (!newVal.trim()) {
    emptyCities.value = false;
    
    if (isDropdownOpened.value) {
      closeDropdown();
    }
  }
});

watch(selectedCity, (city: SelectedCity | null) => {
  if (city) {
    isWeatherLoading.value = true;

    searchWeather().then(() => {
      isWeatherLoading.value = false;
    });
  }
});

const searchWeather = async () => {
  return Promise.all([handleSearchCurrent(), handleSearchForecast()])
    .then(([current, forecast]) => populateWeatherData(current, forecast))
}

const populateWeatherData = (current: WeatherCurrent, forecast: ForecastDay[][]) => {
  currentWeather.value = current;
  forecastWeather.value = forecast;
}

const handleSearchCurrent = async () => {
  const data = await apiService.getCurrent(selectedCity.value?.lat!, selectedCity.value?.lon!);
  
  return Promise.resolve(data);
};


const handleSearchForecast = async () => {
  const data = await apiService.getForecast(selectedCity.value?.lat!, selectedCity.value?.lon!);
  
  return Promise.resolve(data);
};

const handleRegimeClick = (value: 'day' | 'week') => {
  selectedRegime.value = value;
  closeDropdown();
};

const debounceValueChange = debounce((newVal: string) => {
  handleSearchCities(newVal);
  console.log('newVal: ', newVal);
}, 1000);

const handleCityClick = (lat: number, lon: number) => {
  selectedCity.value = { lat, lon };
  closeDropdown();
  resetInput();

  console.log('select: ', lat + ' ' + lon)
};

const resetInput = () => value.value = '';
const closeDropdown = () => isDropdownOpened.value = false;

const handleSearchCities = async (newVal: string) => {
  isSearching.value = true;
  selectedCity.value = null;

  const data = await apiService.getCities(newVal);
  cities.value = data;
  
  isSearching.value = false;
  emptyCities.value = data && data?.length === 0;
  isDropdownOpened.value = data?.length > 0;

  console.log('cities: ', cities);
};

</script>