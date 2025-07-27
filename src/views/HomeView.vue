<script setup>
import ImageEditorModal from '@/components/shared/ImageEditorModal.vue';
import api from'@/services/axios.js'
import { onMounted, ref } from 'vue';
import UserCard from '@/components/user/UserCard.vue';
const users = ref([])

onMounted(async () => {
    let res = await api.get('/users/cards')
    users.value = res.data
})

</script>

<template>
    <!--<image-editor-modal />-->
    <user-card v-for="user in users" :user="user"></user-card>
</template>
