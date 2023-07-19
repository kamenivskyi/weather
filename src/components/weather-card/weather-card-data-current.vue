<template>
  <div>Current</div>
  <div v-if="data" class="c-list">
    <p v-if="data.name" class="c-list__item">Name: {{ data.name }}</p>
    <p v-if="data.iconUrl" class="c-list__item">
      <img :src="data.iconUrl" alt="">
    </p>
    <p v-if="data.description" class="c-list__item">Description: {{ data.description }}</p>
    <p v-if="data.country" class="c-list__item">Country: {{ data.country }}</p>
    <p v-if="data.timezone" class="c-list__item">Timezone: {{ data.timezone }}</p>
    <p v-if="data.clouds" class="c-list__item">Clouds: {{ data.clouds }}</p>
    <p v-if="data.tempMin" class="c-list__item">Min temp: {{ data.tempMin }}</p>
    <p v-if="data.tempMax" class="c-list__item">Max temp: {{ data.tempMax }}</p>
  </div>
</template>

<script setup lang="ts">
import type { WeatherCurrent } from '@/models';
import { apiService } from '@/services/api-service';

interface Props {
  data: WeatherCurrent | null,
}

defineProps<Props>();

</script>