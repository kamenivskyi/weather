<template>
  <div class="c-weather-card__forecast-day">
    <div v-for="item in data" :key="item.dt" class="c-weather-card__forecast-day-item">
      <div v-if="item.dt_txt" class="c-weather-card__data-item">{{ getHours(item.dt_txt) }}</div>
      <img
        v-if="item.weather[0].icon"
        :src="apiService.getIconUrl(item.weather[0].icon)"
        alt="icon"
      />
      <div>
        <div v-if="item.main.temp" class="c-weather-card__data-item">
          {{ item.main.temp }} &#8451;
        </div>
        <div v-if="item.weather[0].description" class="c-weather-card__data-item">
          {{ item.weather[0].description }}
        </div>
        <div v-if="item.wind.speed" class="c-weather-card__data-item">
          {{ t('card.wind') }}: {{ item.wind.speed }}m/s
        </div>
        <div v-if="item.clouds.all" class="c-weather-card__data-item">
          {{ t('card.clouds') }}: {{ item.clouds.all }}&#37;
        </div>
        <div v-if="item.main.pressure" class="c-weather-card__data-item">
          {{ t('card.pressure') }}: {{ item.main.pressure }} hpa
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHours } from '@/utils';
import type { ForecastDay } from '@/models';
import { apiService } from '@/services/api-service';
import { useI18n } from 'vue-i18n';

interface Props {
  data: ForecastDay[];
}

defineProps<Props>();

const { t } = useI18n();
</script>
