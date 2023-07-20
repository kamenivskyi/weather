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
        <WeatherCard 
          v-for="item in store.data.cards" 
          :data="item" 
          :key="item.id" 
          @remove="handleRemoveCard"
        />
      </div>
      <AppModal :isOpen="showMaxBlocksModal" @close="onClose" title="Notification">
        <p class="u-mb-3">There can be a maximum of 5 blocks, remove some to add a new one!</p>
        <AppButton @click="showMaxBlocksModal = false">Close Modal</AppButton>
      </AppModal>

      <AppModal :isOpen="showConfirmRemoveModal" @close="onCloseConfirmRemoveModal" title="Notification">
        <p class="u-mb-3">Are you sure you want to remove this block?</p>
        <div>
          <AppButton @click="showConfirmRemoveModal = false">No, close modal</AppButton>
          <AppButton @click="handleRemoveClick" variant="danger" pill class="u-ml-20">Yes, remove it</AppButton>
        </div>
      </AppModal>

      <AppModal :isOpen="showCantRemoveModal" @close="onCloseShowCantRemoveModal" title="Notification">
        <p class="u-mb-3">You can't remove the last block</p>
        <div>
          <AppButton @click="showCantRemoveModal = false">Ok</AppButton>
        </div>
      </AppModal>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import AppButton from '@/components/app-button.vue';
import AppModal from '@/components/app-modal.vue';
import WeatherCard from '@/components/weather-card/weather-card.vue';
import { useHomeCardsStore } from '@/stores/home-cards';
import type { WeatherCardInterface } from '@/stores/home-cards';

const store = useHomeCardsStore();

const showMaxBlocksModal = ref(false);
const showConfirmRemoveModal = ref(false);
const showCantRemoveModal = ref(false);

const removeCardId = ref<number | null>(null);

const MAX_ALLOWED_BLOCKS = 5;

const allowToAdd = computed(() => store.data.cards.length < MAX_ALLOWED_BLOCKS);
const allowToRemove = computed(() => store.data.cards.length > 1);

const handleAddNewCard = () => {
  if (allowToAdd.value) {
    // incrementValue();

    const newCard = {
      id: Math.random(),
      selectedRegime: 'day',
      selectedCity: null,
      currentWeather: null,
      forecastWeather: null,
    } as WeatherCardInterface;

    store.addWeatherCard(newCard);
  }
  else {
    showMaxBlocksModal.value = true;
    console.log('no more allowed');
  }
}

const handleRemoveCard = (id: number) => {
  console.log('remove: ', id);
  console.log('allow?: ', allowToRemove.value);
  if (allowToRemove.value) {
    removeCardId.value = id;
    showConfirmRemoveCard();
  }
  else {
    console.log('no allowed')
    showCantRemoveModal.value = true;
    // nextTick(() => {
    //   if (showCantRemoveModal.value === false) {
    //   } 
    // })
  }
};

const showConfirmRemoveCard = () => {
  console.log('show');
  nextTick(() => {
    showConfirmRemoveModal.value = true;
  })
}

const handleRemoveClick = () => {
  if (removeCardId.value) {
    store.removeWeatherCard(removeCardId.value);

    removeCardId.value = null;
  }
  showConfirmRemoveModal.value = false;
  console.log('yes, remove it');
}

const onClose = (value: boolean) => {
  showMaxBlocksModal.value = false;
}
const onCloseConfirmRemoveModal = (value: boolean) => {
  showConfirmRemoveModal.value = false;
}

const onCloseShowCantRemoveModal = () => {
  showCantRemoveModal.value = false;
}

</script>
