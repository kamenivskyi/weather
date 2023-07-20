<template>
  <div class="c-weather-card">
    <div class="c-weather-card__header">  
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

    <!-- <AppSpinner v-if="isWeatherLoading" /> -->

    <!-- <template v-else> -->
      <template v-if="selectedRegime === 'day'">
        <WeatherCardDataCurrent v-if="currentWeather" :data="currentWeather" />

        <WeatherCardCurrentChart
          v-if="currentWeather"
          :temperatureMin="currentWeather?.tempMin"
          :tempereatureMax="currentWeather?.tempMax"
          :tempereatureAvg="currentWeather?.temp"
        />
      </template>

      <template v-else-if="selectedRegime === 'week'">
        <WeatherCardDataForecast v-if="forecastWeather" :data="forecastWeather" />
        <WeatherCardForecastChart v-if="forecastWeather" :data="forecastWeather" />
      </template>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ForecastDay, WeatherCurrent } from '@/models';
import WeatherCardCurrentChart from '@/components/weather-card/weather-card-current-chart.vue';
import WeatherCardDataForecast from '@/components/weather-card/weather-card-data-forecast.vue';
import WeatherCardForecastChart from '@/components/weather-card/weather-card-forecast-chart.vue';
import WeatherCardDataCurrent from '@/components/weather-card/weather-card-data-current.vue';
import AppButton from '@/components/app-button.vue';

interface Props {
  currentWeather: WeatherCurrent | null
  forecastWeather: ForecastDay[][]
}

const selectedRegime = ref<'day' | 'week'>('day');
// const currentWeather = 

const props = defineProps<Props>();

const handleRegimeClick = (value: 'day' | 'week') => {
  selectedRegime.value = value;
  // homeStore.setSelectedRegime(props.data.id, value);
  // closeDropdown();
};

</script>