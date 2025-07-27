<script setup>
import api from '@/services/axios.js';
import { onMounted, ref } from 'vue';
import router from '@/router/index.js';
import DotGoeyLinear from '@/components/shared/DotGoeyLinear.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const userUuid = route.params.userUuid
const user = ref(null)
const conversation = ref(null)
const loading = ref(false)

onMounted(async () => {
    try {
        let res = await api.get('users/'+userUuid)
        user.value = res.data
    } catch (e) {

    }
})

const startConversation = async () => {
    loading.value = true
    try {
        let res = await api.post('conversations/start/'+userUuid, {
            participant_ids: [user.value.id],

        })
        conversation.value = res.data
        await router.push('/conversations/'+conversation.value.uuid+'/show')
    } catch (e) {

    }
    loading.value = false
}

</script>

<template>
    <button v-if="user" @click="startConversation" class="btn btn-secondary">Commencer une conversation avec {{user.name}}</button>
    <transition name="fade">
        <dot-goey-linear v-if="loading"></dot-goey-linear>
    </transition>
</template>

<style scoped>

</style>