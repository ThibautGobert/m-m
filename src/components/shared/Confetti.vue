<script setup>
import confetti from "canvas-confetti";
import { onMounted } from 'vue';
const statusCanvas = document.getElementById('status');

const handleConfetti = () => {
    const statusConfetti = confetti.create(statusCanvas, { resize: true });
    statusConfetti({
        particleCount: 100,
        spread: 160
    });
}

onMounted(() => {
    handleConfetti()
})

</script>

<template>

</template>

<style scoped>

</style>