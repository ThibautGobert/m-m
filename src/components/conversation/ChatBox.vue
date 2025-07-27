<template>
    <div ref="scrollContainer" class="h-full overflow-y-auto flex flex-col-reverse" @scroll="handleScroll">
        <!-- Loader top -->
        <div v-if="loading" class="text-center py-2 text-gray-500">Loading...</div>

        <!-- Messages -->
        <div v-for="message in messages" :key="message.id" class="p-2 border-b border-gray-200">
            <div class="text-sm text-gray-600">{{ message.sender.name }}</div>
            <div class="text-base">{{ message.content }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const props = defineProps({
    conversationId: {
        type: Number,
        required: true
    }
})

const messages = ref([])
const hasMore = ref(true)
const loading = ref(false)
const scrollContainer = ref(null)

async function loadMessages(beforeId = null) {
    if (loading.value || !hasMore.value) return

    loading.value = true

    const params = beforeId ? { before: beforeId } : {}
    const res = await axios.get(`/api/conversations/${props.conversationId}/messages`, { params })

    if (res.data.length === 0) {
        hasMore.value = false
    } else {
        messages.value = [...res.data, ...messages.value]
    }

    loading.value = false

    // Après avoir ajouté, garder la position
    await nextTick()
    if (beforeId) {
        // On ajuste le scroll pour éviter les "sauts"
        const container = scrollContainer.value
        if (container) {
            container.scrollTop = container.scrollHeight / 2
        }
    } else {
        // Premier chargement → scroll tout en bas
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
}

function handleScroll() {
    const container = scrollContainer.value
    if (!container) return

    // Détection proche du haut
    if (container.scrollTop < 50 && hasMore.value && !loading.value) {
        const firstMessageId = messages.value.length ? messages.value[0].id : null
        loadMessages(firstMessageId)
    }
}

onMounted(() => {
    loadMessages()
})
</script>

<style scoped>
/* Tu peux ajouter un loader visuel plus élégant si tu veux */
</style>
