<script setup>
import { useAuthStore } from '@/stores/auth.js'
import api from '@/services/axios.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const authStore = useAuthStore()

const route = useRoute()
const apiVerificationUrl = route.query.url
const token = route.query.token

onMounted(async () => {
    if (apiVerificationUrl && token) {
        try {
            let res = await api.get(apiVerificationUrl, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
        } catch (e) {

        }
    }
})

</script>

<template>

</template>

<style scoped>

</style>