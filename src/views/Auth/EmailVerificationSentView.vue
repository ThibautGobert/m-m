<script setup>
import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()
import { useEcho } from "@laravel/echo-vue";
import { Events } from '@/enums/Events.js';
import { onMounted, ref } from 'vue';
import router from '@/router/index.js';
import { handleConfetti } from '@/services/confetti.js';
import DotShuttle from '@/components/shared/DotShuttle.vue';
import DotGoey from '@/components/shared/DotGoey.vue';
import BlobsLoader from '@/components/shared/BlobsLoader.vue';
import RotatingDotGoey from '@/components/shared/RotatingDotGoey.vue';
import CircleDots from '@/components/shared/CircleDots.vue';
import DotGoeyLinear from '@/components/shared/DotGoeyLinear.vue';
const isVerified = ref(false)

onMounted(async () => {
    if (!authStore.getUser) {
       // await router.push('/')
    }
})
useEcho(
    `user.${authStore.getUser?.uuid}`,
    Events.AuthEmailVerified,
    (e) => {
        console.log('Email vérifié !', e)
        isVerified.value = true
        handleConfetti()
    }
)


</script>

<template>
    <div v-if="!isVerified" class="card bg-base-100 shadow-accent">
        An email has been sent to : {{authStore.getUser?.email}}
        <dot-goey-linear :duration="1" :count="4" :moving-dot-size="16"></dot-goey-linear>
        <circle-dots :circle-diameter="60" :dot-count="5" :duration="1.5"></circle-dots>
        <dot-shuttle />

        <dot-goey :count="2" :duration="2"></dot-goey>
        <dot-goey :count="3" :duration="2"></dot-goey>
        <!--
        <dot-goey :count="4" :duration="2"></dot-goey>
        <dot-goey :count="5"></dot-goey>
        <dot-goey :count="6" :duration="10" moving-dot-color="#dca54d" fixed-dot-color="#dca54d"></dot-goey>
        <dot-goey :count="7" :duration="10" :fixed-dot-size="25" :moving-dot-size="25"></dot-goey>
        <dot-goey :count="10" :duration="10" :fixed-dot-size="20" :moving-dot-size="12" moving-dot-color="#dca54d" fixed-dot-color="#dca54d"></dot-goey>
        <dot-goey :count="10" :duration="15" :fixed-dot-size="20" :moving-dot-size="21" moving-dot-color="#dca54d" fixed-dot-color="#dca54d"></dot-goey>
        -->
       <!-- <dot-streching></dot-streching> -->
        <blobs-loader />

        <rotating-dot-goey :count="5" :duration="3"></rotating-dot-goey>
    </div>
    <div v-else class="card bg-base-100 shadow-accent">
        Your email has been verified !
    </div>




</template>

<style scoped>

</style>