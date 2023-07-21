<template>
  <div class="c-weather-card">
    <div class="c-weather-card__header"></div>
    <div class="u-row u-align-items-center">
      <div class="c-weather-card__tabs u-w-100 u-d-flex u-space-between">
        <div>
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

        <AppButton @click="handleRemoveClick(id)" variant="danger">Remove</AppButton>
      </div>
    </div>

    <!-- <AppSpinner v-if="isWeatherLoading" /> -->

    <!-- <template v-else> -->
    <template v-if="selectedRegime === 'day'">
      <WeatherCardDataCurrent v-if="current" :data="current" />

      <WeatherCardCurrentChart
        v-if="current"
        :temperatureMin="current?.tempMin"
        :tempereatureMax="current?.tempMax"
        :tempereatureAvg="current?.temp"
      />
    </template>

    <template v-else-if="selectedRegime === 'week'">
      <WeatherCardDataForecast v-if="forecast" :data="forecast" />
      <WeatherCardForecastChart v-if="forecast" :data="forecast" />
    </template>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import type { ForecastDay, WeatherCurrent } from '@/models';
import WeatherCardCurrentChart from '@/components/weather-card/weather-card-current-chart.vue';
import WeatherCardDataForecast from '@/components/weather-card/weather-card-data-forecast.vue';
import WeatherCardForecastChart from '@/components/weather-card/weather-card-forecast-chart.vue';
import WeatherCardDataCurrent from '@/components/weather-card/weather-card-data-current.vue';
import AppButton from '@/components/app-button.vue';

interface Props {
  current: WeatherCurrent | null;
  forecast: ForecastDay[][] | null;
  lat: number;
  lon: number;
  id: number;
}

const selectedRegime = ref<'day' | 'week'>('day');
// const currentWeather =

const props = defineProps<Props>();
const emit = defineEmits(['removeChoosen']);

onMounted(() => {
  console.log('props: ', props);
});

const handleRegimeClick = (value: 'day' | 'week') => {
  selectedRegime.value = value;
  // homeStore.setSelectedRegime(props.data.id, value);
  // closeDropdown();
};

const handleRemoveClick = (id: number) => {
  emit('removeChoosen', id);
};
</script>
