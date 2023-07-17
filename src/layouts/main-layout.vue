<template>
  <TheHeader />
  <main class="main">
    <slot />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
  import TheHeader from '@/components/the-header.vue';
  import TheFooter from '@/components/the-footer.vue';
</script>