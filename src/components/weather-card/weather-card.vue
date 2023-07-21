<template>
  <div class="c-weather-card">
    <div class="c-weather-card__header">
      <div class="c-weather-card__search-panel">
        <div class="u-row u-mb-3">
          <AppButton @click="handleAddToChosen" variant="primary" pill>Add to chosen</AppButton>
          <AppButton @click="handleRemoveCard" variant="danger" pill class="u-ml-20">Remove block</AppButton>
        </div>
        
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
      
    </div>
    <div class="c-weather-card__tabs">
      <AppButton
        @click="handleRegimeClick('day')"
        :class="{
          'u-bg--primary': selectedRegime === 'day'
        }"
      >
        Day
      </AppButton>
      <AppButton
        @click="handleRegimeClick('week')"
        :class="{
          'u-bg--primary': selectedRegime === 'week'
        }"
      >
        Week
      </AppButton>
    </div>

    <AppSpinner v-if="isWeatherLoading" />

    <template v-else>
      <template v-if="selectedRegime === 'day'">
        <WeatherCardDataCurrent :data="currentWeather" />

        <WeatherCardCurrentChart
          :temperatureMin="currentWeather?.tempMin"
          :tempereatureMax="currentWeather?.tempMax"
          :tempereatureAvg="currentWeather?.temp"
        />
      </template>

      <template v-else-if="selectedRegime === 'week'">
        <WeatherCardDataForecast :data="forecastWeather" />
        <WeatherCardForecastChart :data="forecastWeather" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppButton from '@/components/app-button.vue';
import AppSpinner from '@/components/app-spinner.vue';
import debounce from 'lodash.debounce';
import { apiService } from '@/services/api-service';
import type { DropdownCity, ForecastDay, SelectedCity, WeatherCurrent } from '@/models';
import WeatherCardDataForecast from './weather-card-data-forecast.vue';
import WeatherCardDataCurrent from './weather-card-data-current.vue';
import WeatherCardCurrentChart from '@/components/weather-card/weather-card-current-chart.vue';
import WeatherCardForecastChart from '@/components/weather-card/weather-card-forecast-chart.vue';
import { useHomeCardsStore, type WeatherCardInterface } from '@/stores/home-cards';
import { useChosenStore, type ChosenCity } from '@/stores/chosen';

const value = ref('');
const isDropdownOpened = ref(false);
const cities = ref<DropdownCity[] | null>(null);
const isSearching = ref(false);
const isWeatherLoading = ref(false);
const emptyCities = ref(false);

interface Props {
  data: WeatherCardInterface,
}

const props = defineProps<Props>();
const emit = defineEmits(['remove']);

const homeStore = useHomeCardsStore();
const chosenStore = useChosenStore();

const selectedRegime = computed(() => props.data.selectedRegime);
const selectedCity = computed(() => props.data.selectedCity);
const currentWeather = computed(() => props.data.currentWeather);
const forecastWeather = computed(() => props.data.forecastWeather); 

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
  return Promise.all([handleSearchCurrent(), handleSearchForecast()]).then(([current, forecast]) =>
    populateWeatherData(current, forecast)
  );
};

const populateWeatherData = (current: WeatherCurrent, forecast: ForecastDay[][]) => {
  homeStore.setCurrentWeather(props.data.id, current);
  homeStore.setForecastWeather(props.data.id, forecast);
};

const handleSearchCurrent = async () => {
  const data = await apiService.getCurrent(selectedCity.value?.lat!, selectedCity.value?.lon!);

  return Promise.resolve(data);
};

const handleSearchForecast = async () => {
  const data = await apiService.getForecast(selectedCity.value?.lat!, selectedCity.value?.lon!);

  return Promise.resolve(data);
};

const handleRegimeClick = (value: 'day' | 'week') => {
  homeStore.setSelectedRegime(props.data.id, value);
  closeDropdown();
};

const debounceValueChange = debounce((newVal: string) => {
  handleSearchCities(newVal);
  console.log('newVal: ', newVal);
}, 1000);

const handleCityClick = (lat: number, lon: number) => {
  homeStore.setSelectedCity(props.data.id, { lat, lon });
  closeDropdown();
  resetInput();
};

const handleRemoveCard = () => {
  if (props.data.id) {
    emit('remove', props.data.id);
  }
};

const handleAddToChosen = () => {
  console.log('chosenStore: ', chosenStore.chosenCities);
  if (props.data.selectedCity) {
    console.log('chose: ', props.data.selectedCity);
    chosenStore.addChosenCity({ 
      ...props.data.selectedCity,
      current: props.data.currentWeather,
      forecast: props.data.forecastWeather,
      id: props.data.id,
    });
  }
}

const resetInput = () => (value.value = '');
const closeDropdown = () => (isDropdownOpened.value = false);

const handleSearchCities = async (newVal: string) => {
  isSearching.value = true;
  homeStore.setSelectedCity(props.data.id, null);

  const data = await apiService.getCities(newVal);
  cities.value = data;

  isSearching.value = false;
  emptyCities.value = data && data?.length === 0;
  isDropdownOpened.value = data?.length > 0;

  console.log('cities: ', cities);
};
</script>
