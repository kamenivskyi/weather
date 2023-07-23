<template>
  <div class="chosen">
    <div class="container">
      <template v-if="hasChosenCities">
        <div class="c-slider">
          <ChosenWeatherCard
            v-for="item in cities"
            :current="item.current"
            :forecast="item.forecast"
            :lat="item.lat"
            :lon="item.lon"
            :id="item.id"
            :key="item.id"
            @removeChoosen="handleRemoveChoosen"
          />
        </div>
      </template>
      <template v-if="!hasChosenCities">
        <p>{{ t('chosenPage.noCities') }}</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChosenWeatherCard from '@/components/chosen-weather-card/chosen-weather-card.vue';
import { useChosenStore } from '@/stores/chosen';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const chosenStore = useChosenStore();
const { t } = useI18n();

const cities = computed(() => chosenStore.chosenCities);
const hasChosenCities = computed(() => cities.value.length > 0);

const handleRemoveChoosen = (id: number) => {
  if (id) {
    chosenStore.removeChosenCity(id);
  }
};
</script>

<style></style>
