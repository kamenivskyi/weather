<template>
  <main>
    <div class="container">
      <AppButton @click="handleAddNewCard" variant="danger" pill> + </AppButton>

      <div class="c-slider">
        <WeatherCard
          v-for="item in store.data.cards"
          :data="item"
          :isLoadingByIp="isLoadingByIp"
          :key="item.id"
          @remove="handleRemoveCard"
        />
      </div>
      <AppModal :isOpen="showMaxBlocksModal" @close="onClose" title="Notification">
        <p class="u-mb-3">{{ t('modals.max5blocksMessage') }}</p>
        <AppButton @click="showMaxBlocksModal = false">
          {{ t('modals.closeModal') }}
        </AppButton>
      </AppModal>

      <AppModal
        :isOpen="showConfirmRemoveModal"
        @close="onCloseConfirmRemoveModal"
        :title="t('modals.titleDefault')"
      >
        <p class="u-mb-3">{{ t('modals.confirmRemoveBlock.message') }}</p>
        <div>
          <AppButton @click="showConfirmRemoveModal = false">{{ t('modals.confirmRemoveBlock.no') }}</AppButton>
          <AppButton 
            @click="handleRemoveClick" 
            variant="danger" 
            pill 
            class="u-ml-20"
          >
          {{ t('modals.confirmRemoveBlock.yes') }}
          </AppButton
          >
        </div>
      </AppModal>

      <AppModal
        :isOpen="showCantRemoveModal"
        @close="onCloseShowCantRemoveModal"
        :title="t('modals.titleDefault')"
      >
        <p class="u-mb-3">{{ t('modals.cantRemoveLastBlock') }}</p>
        <div>
          <AppButton @click="showCantRemoveModal = false">Ok</AppButton>
        </div>
      </AppModal>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import AppButton from '@/components/app-button.vue';
import AppModal from '@/components/app-modal.vue';
import WeatherCard from '@/components/weather-card/weather-card.vue';
import { useHomeCardsStore } from '@/stores/home-cards';
import type { WeatherCardInterface } from '@/stores/home-cards';
import { getGeolocation } from '@/utils';
import i18n from '@/locales/i18n';
import { useI18n } from 'vue-i18n';

const store = useHomeCardsStore();
const { t } = useI18n();

const showMaxBlocksModal = ref(false);
const showConfirmRemoveModal = ref(false);
const showCantRemoveModal = ref(false);
const isLoadingByIp = ref(false);

const removeCardId = ref<number | null>(null);

const selectedLocale = ref('en');

onMounted(() => {
  if (store.data.firstMount) {
    handleCoordinates();
  }
});


const MAX_ALLOWED_BLOCKS = 5;

const allowToAdd = computed(() => store.data.cards.length < MAX_ALLOWED_BLOCKS);
const allowToRemove = computed(() => store.data.cards.length > 1);

const handleCoordinates = async () => {
  if (store.data.cards.length === 1) {
    try {
      isLoadingByIp.value = true;
      const coords = await getGeolocation();

      store.setSelectedCity(store.data.cards[0].id, {
        lat: coords.latitude,
        lon: coords.longitude
      });
  
      store.setFirstMount(false);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      isLoadingByIp.value = false;
    }
  }
};

const handleAddNewCard = () => {
  if (allowToAdd.value) {

    const newCard = {
      id: Math.random(),
      selectedRegime: 'day',
      selectedCity: null,
      currentWeather: null,
      forecastWeather: null
    } as WeatherCardInterface;

    store.addWeatherCard(newCard);
  } else {
    showMaxBlocksModal.value = true;
    console.log('no more allowed');
  }
};

const handleRemoveCard = (id: number) => {

  if (allowToRemove.value) {
    removeCardId.value = id;
    showConfirmRemoveCard();
  } else {
    console.log('no allowed');
    showCantRemoveModal.value = true;
  }
};

const showConfirmRemoveCard = () => {
  nextTick(() => {
    showConfirmRemoveModal.value = true;
  });
};

const handleRemoveClick = () => {
  if (removeCardId.value) {
    store.removeWeatherCard(removeCardId.value);

    removeCardId.value = null;
  }
  showConfirmRemoveModal.value = false;
};

const onClose = (value: boolean) => {
  showMaxBlocksModal.value = false;
};
const onCloseConfirmRemoveModal = (value: boolean) => {
  showConfirmRemoveModal.value = false;
};

const onCloseShowCantRemoveModal = () => {
  showCantRemoveModal.value = false;
};
</script>
