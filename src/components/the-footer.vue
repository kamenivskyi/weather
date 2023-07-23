<template>
  <footer class="o-footer">
    <div class="container">
      <div class="o-footer__inner">{{ t('footer') }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { getCurrentInstance, type ComponentInternalInstance } from 'vue';
import { useI18n } from 'vue-i18n';
// interface ComponentContext {
//   $t: (key: string) => string;
// }

const { t } = useI18n();
// const instance = getCurrentInstance() as ComponentInternalInstance;
// const appContext = instance.appContext;
// const $t = appContext.app.config.globalProperties.$t;
// console.log('inst: ', t);
// console.log('instance: ', instance);
// const context = instance?.ctx;

</script>
