<template>
  <div class="c-weather-card">
    <div class="c-weather-card__header">
      <input v-model="value" class="c-input" type="search" placeholder="Search" />
      <AppButton variant="primary" pill>Add to chosen</AppButton>
    </div>
    <div class="c-weather-card__tabs">
      <AppButton>Day</AppButton>
      <AppButton>Week</AppButton>
    </div>
    <WeatherCardData />
    <WeatherCardChart />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/components/app-button.vue';
import WeatherCardData from '@/components/weather-card/weather-card-data.vue';
import WeatherCardChart from '@/components/weather-card/weather-card-chart.vue';

const value = ref('');
</script>