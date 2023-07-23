<template>
  <div class="u-mb-3">{{ t('chosenPage.title') }}</div>
  <template v-if="data && data.length > 0">
    <WeatherCardDataForecastDay v-for="item in data" :data="item" />
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import WeatherCardDataForecastDay from './weather-card-data-forecast-day.vue';
import type { ForecastDay } from '@/models';
import { useI18n } from 'vue-i18n';

interface Props {
  data: ForecastDay[][] | null;
}

const props = defineProps<Props>();

const { t } = useI18n();

watch(
  () => props.data,
  (newData) => {
    console.log('its new DATA: ', newData);
  }
);
</script>
