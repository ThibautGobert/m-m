import api from '@/services/axios.js';
import i18n from '@/services/i18n.js';

const CACHE_KEY = (concept, locale) => `i18n:${locale}:${concept}`;

export async function preloadTranslationStatus() {
    const locale = i18n.global.locale.value
    try {
        const res = await api.get(`/translations/${locale}/status`)
        localStorage.setItem(`i18n_status_${locale}`, JSON.stringify(res.data))
    } catch (e) {
        console.log(`Erreur preloadTranslationStatus: ${e}`);
    }
}

export async function loadTranslationConcept(conceptKey) {
    const locale = i18n.global.locale.value
    const status = JSON.parse(localStorage.getItem(`i18n_status_${locale}`) || '{}')

    const stored = localStorage.getItem(`i18n_data_${locale}_${conceptKey}`)
    const storedUpdatedAt = parseInt(localStorage.getItem(`i18n_updated_at_${locale}_${conceptKey}`) || '0')
    const latestUpdatedAt = status?.[conceptKey] || 0

    if (stored && storedUpdatedAt >= latestUpdatedAt) {
        const parsed = JSON.parse(stored)
        i18n.global.mergeLocaleMessage(locale, parsed)
        return
    }

    try {
        const response = await api.get(`/translations/${locale}/concept/${conceptKey}`)
        const { translations, updated_at } = await response.data

        const converted = convertLaravelPlaceholders(translations)

        i18n.global.mergeLocaleMessage(locale, converted)
        localStorage.setItem(`i18n_data_${locale}_${conceptKey}`, JSON.stringify(converted))
        localStorage.setItem(`i18n_updated_at_${locale}_${conceptKey}`, updated_at)
    } catch (e) {
        console.error(`Erreur loadTranslationConcept(${conceptKey}) :`, e)
    }
}

function convertLaravelPlaceholders(obj) {
    if (typeof obj === 'string') {
        return obj.replace(/:([a-zA-Z_]+)/g, '{\$1}');
    }
    if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const key in obj) {
            result[key] = convertLaravelPlaceholders(obj[key]);
        }
        return result;
    }
    return obj;
}