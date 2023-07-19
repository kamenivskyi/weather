<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainLayout from './layouts/main-layout.vue';
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style lang="scss">
  @import 'assets/scss/style.scss';
</style>
