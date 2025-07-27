<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin)
import api from '@/services/axios.js';
import InputError from '@/components/shared/InputError.vue';
import { useLayoutStore } from '@/stores/layout.js'
import ConfettiExplosion from '@/components/shared/ConfettiExplosion.vue';
const layoutStore = useLayoutStore()
import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()



const email = ref('')
const password = ref('')
const errors = ref({})

onMounted(() => {
    gsap.to("#lock", { duration: 1.5, morphSVG: "#unlock", repeat: -1, yoyo: true, repeatDelay:2 });
})

const handleLogin = async () => {
    errors.value = {}
    layoutStore.setIsLoading(true)
    try {
        let res = await api.post('/login', {
            email: email.value,
            password: password.value,
        })
        authStore.setUser(res.data.user)
        authStore.setBearerToken(res.data.token)
    } catch (e) {
        if (e.response && e.response.data && e.response.data.errors) {
            errors.value = e.response.data.errors
        }
    }
    layoutStore.setIsLoading(false)
}
</script>

<template>
    <div id="auth-card" class="flex justify-center items-center min-h-screen bg-base-200">
        <div class="card w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <div class="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 30 30">
                            <path id="lock" fill="currentColor" d="M16 6a4 4 0 0 0-8 0v2H5.5A1.5 1.5 0 0 0 4 9.5v11A1.5 1.5 0 0 0 5.5 22H11v-.19c0-.463.184-.909.513-1.237l3.52-3.52A4.5 4.5 0 0 1 20 12.027V9.5A1.5 1.5 0 0 0 18.501 8H16V6Zm-1.5 2h-5V6a2.5 2.5 0 0 1 5 0v2Zm-4 7a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0ZM23 16.5a3.5 3.5 0 0 1-3.5 3.5H18v1a.5.5 0 0 1-.5.5h-1v1a.5.5 0 0 1-.5.5h-1v.5a.5.5 0 0 1-.5.5h-1.75a.75.75 0 0 1-.75-.75v-1.44a.75.75 0 0 1 .22-.53l3.75-3.75a.75.75 0 0 1 .15-.116A3.5 3.5 0 1 1 23 16.5Zm-3 .5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/>
                            <path id="unlock" fill="currentColor" d="M18 5.5a3 3 0 1 1 6 0v1a.75.75 0 0 0 1.5 0v-1a4.5 4.5 0 1 0-9 0V8H7.75A3.75 3.75 0 0 0 4 11.75v9.5A3.75 3.75 0 0 0 7.75 25h11.5A3.75 3.75 0 0 0 23 21.25v-9.5A3.75 3.75 0 0 0 19.25 8H18V5.5ZM13.5 18a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3Z"/>
                        </svg>
                    </div>
                    <h2 class="text-center text-2xl font-bold">
                        Login
                    </h2>
                </div>
                <form @submit.prevent="handleLogin">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <div class="sk-load">
                            <input type="email" placeholder="email" autocomplete="email" class="input input-bordered" v-model="email" required />
                        </div>
                        <InputError :errors="errors" field="email"></InputError>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Mot de passe</span>
                        </label>
                        <div class="sk-load">
                            <input type="password" placeholder="mot de passe" autocomplete="current-password" class="input input-bordered" v-model="password" required />
                        </div>
                        <InputError :errors="errors" field="password"></InputError>
                    </div>

                    <div class="form-control mt-6 text-end">
                        <button type="submit" class="btn btn-primary">Connexion</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/variables' as *;
svg {
    display:none;
    position:relative;
    display: block;
    margin: 20px auto;
}
#unlock {
    visibility: hidden;
}



</style>