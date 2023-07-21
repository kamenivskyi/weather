<template>
  <header class="o-header">
    <div class="container">
      <div class="o-header__inner">
        <a href="#" class="o-header__logo">{{ $t("logo") }}</a>
        <select v-model="store.selectedLang" class="o-header__select" name="select">
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
const store = useSettingsStore();
</script>
