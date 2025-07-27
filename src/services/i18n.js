import { createI18n } from 'vue-i18n';

export const defaultLocale = 'fr';

const i18n = createI18n({
    legacy: false, // Composition API
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: {
        [defaultLocale]: {} // chargé dynamiquement
    },
});

export default i18n;