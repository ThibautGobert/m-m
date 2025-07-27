<script setup>
import NavBar from '@/components/layouts/includes/NavBar.vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { loadTranslationConcept } from '@/services/i18nService';
import { watch } from 'vue';

const route = useRoute();
watch(() => route.meta.translationConcept, async (concept) => {
    if (concept) {
        await loadTranslationConcept(concept);
    }
}, { immediate: true });

</script>

<template>
    <NavBar></NavBar>
    <main>
        <router-view></router-view>
    </main>
</template>

<style scoped>

</style>