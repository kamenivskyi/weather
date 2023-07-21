<template>
  <div>{{ $t('card.current') }}</div>
  <div v-if="data" class="c-list">
    <p v-if="data.name" class="c-list__item">{{ $t('card.name') }}: {{ data.name }}</p>
    <p v-if="data.iconUrl" class="c-list__item">
      <img :src="data.iconUrl" alt="" />
    </p>
    <p v-if="data.description" class="c-list__item">{{ $t('card.description') }}: {{ data.description }}</p>
    <p v-if="data.country" class="c-list__item">{{ $t('card.country') }}: {{ data.country }}</p>
    <p v-if="data.timezone" class="c-list__item">{{ $t('card.timezone') }}: {{ data.timezone }}</p>
    <p v-if="data.clouds" class="c-list__item">{{ $t('card.clouds') }}: {{ data.clouds }}</p>
    <p v-if="data.tempMin" class="c-list__item">{{ $t('card.minTemperature') }}: {{ data.tempMin }}°C</p>
    <p v-if="data.tempMax" class="c-list__item">{{ $t('card.maxTemperature') }}: {{ data.tempMax }}°C</p>
  </div>
</template>

<script setup lang="ts">
import type { WeatherCurrent } from '@/models';
import { apiService } from '@/services/api-service';

interface Props {
  data: WeatherCurrent | null;
}

defineProps<Props>();
</script>
