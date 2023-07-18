<template>
  <button class="c-button" :class="classes" :type="type">
    <div class="c-button__text">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

  interface Props {
    pill?: boolean;
    type?: 'submit' | 'button' | 'reset',
    variant?: 'primary' | 'light' | 'danger' | 'warning',
  }

  const props = withDefaults(defineProps<Props>(), {
    pill: false,
    type: 'button',
    variant: 'light',
  });

  const classes = computed(() => ({ 
    'c-button--pill': props.pill, 
    [`c-button--${props.variant}`]: true,
  }));
</script>