<template>
  <footer class="o-footer">
    <div class="container">
      <div class="o-footer__inner">{{ t('footer') }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>
