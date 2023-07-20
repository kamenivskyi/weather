<template>
  <Teleport to="body">
    <Transition name="c-modal-fade">
      <div v-if="showModal" class="c-modal-overlay">
        <div class="c-modal">
          <div class="c-modal__header">
            <h3>{{ title }}</h3>
            <AppButton @click="closeModal">X</AppButton>
          </div>

          <div class="c-modal__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Teleport, Transition, onMounted, onUnmounted, ref, watch } from 'vue'
import AppButton from '@/components/app-button.vue';

interface Props {
  isOpen?: boolean,
  title?: string,
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: 'Message modal'
});

const emit = defineEmits(['close']);

const showModal = ref(false);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
});

watch(() => props.isOpen, (newValue) => {
  showModal.value = newValue;
}, { deep: true });

const closeModal = () => {
  showModal.value = false;
  emit('close', showModal.value);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (showModal.value && e.key === 'Escape') {
    closeModal();
  }
}

</script>

<style scoped></style>