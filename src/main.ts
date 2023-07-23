import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app.vue';
import router from './router';

import i18n from './locales/i18n';
import { handleAppErrors } from './utils/errors';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.config.errorHandler = handleAppErrors;

app.use(router);

app.use(i18n);

app.mount('#app');
