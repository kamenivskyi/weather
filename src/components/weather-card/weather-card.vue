<template>
  <div class="c-weather-card">
    <div class="c-weather-card__header">
      <input v-model="value" class="c-input" type="search" placeholder="Search" />
      <AppButton variant="primary" pill>Add to chosen</AppButton>
    </div>
    <div class="c-weather-card__tabs">
      <AppButton @click="handleSelectClick('day')">Day</AppButton>
      <AppButton @click="handleSelectClick('week')">Week</AppButton>
    </div>
    <WeatherCardData :selected="selected" />
    <WeatherCardChart />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppButton from '@/components/app-button.vue';
import WeatherCardData from '@/components/weather-card/weather-card-data.vue';
import WeatherCardChart from '@/components/weather-card/weather-card-chart.vue';
import debounce from 'lodash.debounce';
import { apiService } from '@/services/api-service';

const value = ref('');
const selected = ref<'day' | 'week'>('day');
const cities = ref([]);
// const errors = ref(null);

watch(value, (newVal: string) => {
  if (newVal.trim()) {
    debounceValueChange(newVal);
  }
});

const handleSelectClick = (value: 'day' | 'week') => {
  selected.value = value;
}

const debounceValueChange = debounce((newVal) => {
  handleSearchCities(newVal);
  console.log('newVal: ', newVal);
}, 1000);


const handleSearchCities = async (newVal: string) => {
  const cities = await apiService.getCities(newVal);

  console.log('cities: ', cities);
}

</script>