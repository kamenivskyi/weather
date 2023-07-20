<template>
  <main>
    <div class="container">
      <AppButton 
        @click="handleAddNewCard" 
        variant="danger" 
        pill
      >
        +
      </AppButton>

      <div class="c-slider">
        <WeatherCard v-for="num in activeCards" :key="num" />
      </div>
      <AppModal :isOpen="showModal" @close="onClose" title="Notification">
        <p class="u-mb-3">There can be a maximum of 5 blocks, remove some to add a new one!</p>
        <AppButton @click="showModal = false">Close Modal</AppButton>
      </AppModal>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppButton from '@/components/app-button.vue';
import AppModal from '@/components/app-modal.vue';
import WeatherCard from '@/components/weather-card/weather-card.vue';

const activeCards = ref([1]);
const showModal = ref(false);

const MAX_ALLOWED_BLOCKS = 5;

const allowToAdd = computed(() => activeCards.value.length < MAX_ALLOWED_BLOCKS);

const handleAddNewCard = () => {
  if (allowToAdd.value) {
    incrementValue();
  }
  else {
    showModal.value = true;
    console.log('no more allowed');
  }
}

const onClose = (value: boolean) => {
  console.log("ON CLOSED: ! ", value)
  showModal.value = false;
}

const incrementValue = () => {
  activeCards.value.push(activeCards.value.length + 1);
}
</script>
