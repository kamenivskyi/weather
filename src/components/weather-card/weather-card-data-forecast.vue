<template>
  <div class="u-mb-3">Forecast for 5 days</div>
  <template v-if="data && data.length > 0">
    <WeatherCardDataForecastDay v-for="item in data" :data="item" />
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import WeatherCardDataForecastDay from './weather-card-data-forecast-day.vue';
import type { ForecastDay } from '@/models';

interface Props {
  data: ForecastDay[][] | null,
}

const props = defineProps<Props>();

watch(() => props.data, (newData) => {
  console.log('its new DATA: ', newData);
})
</script>