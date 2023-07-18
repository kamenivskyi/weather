<template>
  <div>
    <WeatherCardDataCurrent v-if="selected === 'day'" />
    <WeatherCardDataForecast v-else-if="selected === 'week'" />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import WeatherCardDataCurrent from '@/components/weather-card/weather-card-data-current.vue';
import WeatherCardDataForecast from '@/components/weather-card/weather-card-data-forecast.vue';

interface Props {
  selected: 'day' | 'week'
}

defineProps<Props>();
</script>