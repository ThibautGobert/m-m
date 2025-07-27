<script setup>
import { computed } from 'vue'

const props = defineProps({
    field: {
        type: String,
        required: true
    },
    errors: {
        type: Object,
        required: true
    }
})

const fieldErrors = computed(() => {
    return props.errors?.[props.field] || []
})
</script>

<template>
    <div v-if="fieldErrors.length" class="mt-1 text-sm text-red-600">
        <ul>
            <li v-for="(error, index) in fieldErrors" :key="index">{{ error }}</li>
        </ul>
    </div>
</template>

<style scoped>

</style>