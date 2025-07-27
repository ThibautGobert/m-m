<script setup>
defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="max-w-sm mx-auto my-3 bg-white shadow-lg rounded-2xl overflow-hidden">
        <img class="w-full h-48 object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Photo utilisateur" />

        <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-800">{{user.name}}</h2>
            <p class="text-gray-600 mt-2">Développeur Web passionné par le design moderne et les technologies frontend.</p>

            <div class="mt-4 flex justify-end items-center">
                <router-link :to="'/conversations/'+user.uuid+'/new'">
                    <i class="fa-regular fa-message-plus"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>