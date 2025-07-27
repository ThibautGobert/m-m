import './assets/tailwind.css';
import './assets/scss/app.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerLicense } from '@syncfusion/ej2-base';
import App from './App.vue';
import router from './router';
import { configureEcho } from '@laravel/echo-vue';
import { useAuthStore } from '@/stores/auth.js';
import i18n from './services/i18n.js';
import { preloadTranslationStatus } from '@/services/i18nService.js';

const app = createApp(App);

app.use(createPinia());
const authStore = useAuthStore();
app.use(router);
app.use(i18n);
await preloadTranslationStatus();
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);
app.mount('#app');

const bearerToken = localStorage.getItem('bearerToken');

if(!bearerToken) {
    configureEcho({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        wssPort: import.meta.env.VITE_REVERB_PORT,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        authEndpoint: 'http://m-m-api.test/broadcasting/auth',
    });
} else {
    await authStore.setBearerToken(bearerToken);
}
