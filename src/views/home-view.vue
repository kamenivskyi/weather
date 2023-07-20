<template>
  <main>
    <div class="container">
      <AppButtonVue 
        @click="handleAddNewCard" 
        variant="danger" 
        pill
      >
        +
      </AppButtonVue>

      <div class="c-slider">
        <WeatherCard v-for="item in activeCards" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppButtonVue from '@/components/app-button.vue';
import WeatherCard from '@/components/weather-card/weather-card.vue';

const activeCards = ref([1]);

const allowAdd = computed(() => activeCards.value.length <= 4);

const handleAddNewCard = () => {
  if (allowAdd.value) {
    incrementValue();
  }
  else {
    console.log('no more allowed');
  }
}

const incrementValue = () => {
  activeCards.value.push(activeCards.value.length + 1);
}
</script>
