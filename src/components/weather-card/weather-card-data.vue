<template>
  <slot v-if="selected === 'day'" name="current"></slot>
  <slot v-else-if="selected === 'week'" name="forecast"></slot>
</template>

<script setup lang="ts">
interface Props {
  selected: 'day' | 'week',
}

defineProps<Props>();
</script>