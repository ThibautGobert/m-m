<script setup>
import { onMounted, ref } from 'vue';
import api from '@/services/axios.js';
import { gsap } from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin)
import { useLayoutStore } from '@/stores/layout.js'
import { useAuthStore } from '@/stores/auth.js'
import InputError from '@/components/shared/InputError.vue';
import router from '@/router/index.js';
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const errors = ref({})

onMounted(() => {
    gsap.to("#pen", { duration: 1.5, morphSVG: "#pen-paper", repeat: -1, yoyo: true, repeatDelay:2 });
})
const handleRegister = async ()=> {
    errors.value = {}
    try {
        await layoutStore.setIsLoading(true)
        let res = await api.post('/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
        })
        await authStore.setEmailToBeVerified(email.value)
        await authStore.setBearerToken(res.data.token)
        await authStore.setUser(res.data.user)
        await router.push('/email-verification-sent')
    } catch(e) {
        console.log(e)
        if (e.response && e.response.data && e.response.data.errors) {
            errors.value = e.response.data.errors
        }
    }
    await layoutStore.setIsLoading(false)
}

</script>

<template>
    <div id="auth-card" class="flex justify-center items-center min-h-screen bg-base-200">
        <div class="card w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <div class="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16">
                            <path id="pen-paper" fill="currentColor" d="M2 3a2 2 0 0 1 2-2h3.586a1.5 1.5 0 0 1 1.06.44l2.915 2.914l.014.014L9.944 6H8.5A1.5 1.5 0 0 1 7 4.5V2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3.784q.098.006.198 0H10a1 1 0 0 0 1-.981q.176-.133.333-.29l.667-.667V13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm6.5 2h2.293L8 2.207V4.5a.5.5 0 0 0 .5.5M4 12.5a.5.5 0 0 1 .5-.5h2.508a1 1 0 0 1 .02-.104l.374-1.498a2.2 2.2 0 0 1 .578-1.02l4.83-4.83a1.87 1.87 0 1 1 2.644 2.645l-4.83 4.829a2.2 2.2 0 0 1-1.02.578l-1.498.374a.9.9 0 0 1-.306.024L7.75 13H4.5a.5.5 0 0 1-.5-.5"/>
                            <path id="pen" fill="currentColor" d="M9.021 1.772a2.445 2.445 0 0 1 3.458 3.457l-.272.271l.086.086a2 2 0 0 1 0 2.828l-1.44 1.44a.5.5 0 0 1-.707-.707l1.44-1.44a1 1 0 0 0 0-1.414l-.086-.086l-5.646 5.647a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.595-.643l1.25-3.75a.5.5 0 0 1 .12-.195l6.625-6.625Zm2.75.707a1.445 1.445 0 0 0-2.042 0L3.187 9.02l-.925 2.774l2.982-.745l6.527-6.527a1.445 1.445 0 0 0 0-2.043ZM4.967 15c-1.235 0-2.208-.566-2.855-1.107l1.284-.32a3.2 3.2 0 0 0 1.57.427c.406 0 .824-.164 1.27-.457c.447-.293.878-.687 1.314-1.095l.113-.107c.385-.361.784-.737 1.166-.996c.408-.278.95-.53 1.517-.311c.376.144.62.41.791.736c.161.306.272.688.38 1.105c.05.19.133.374.23.498a.46.46 0 0 0 .114.112c.025.015.036.015.039.015c.122 0 .331-.082.63-.286c.185-.126.344-.252.502-.379c.098-.078.197-.157.302-.235c.279-.209.52-.349.697-.438a3.05 3.05 0 0 1 .278-.124l.02-.008l.007-.002l.003-.001h.001l.16.473l-.159-.474a.5.5 0 0 1 .321.947l-.004.002a2.141 2.141 0 0 0-.175.08c-.13.064-.321.174-.55.346c-.059.043-.135.104-.223.174c-.181.143-.409.324-.618.466c-.31.212-.741.46-1.192.46c-.436 0-.751-.265-.946-.517a2.435 2.435 0 0 1-.405-.858c-.11-.423-.196-.7-.296-.89c-.09-.168-.17-.232-.266-.27c-.082-.03-.245-.033-.595.206c-.313.212-.655.533-1.058.912l-.1.093c-.431.405-.92.855-1.449 1.202c-.53.348-1.14.621-1.818.621Z"/>
                        </svg>
                    </div>
                    <h2 class="text-center text-2xl font-bold">
                        Register
                    </h2>
                </div>
                <form @submit.prevent="handleRegister">
                    <div class="form-control">
                        <label for="email" class="label">
                            <span class="label-text">Nom</span>
                        </label>
                        <div class="sk-load">
                            <input id="name" type="text" placeholder="name" class="input input-bordered" v-model="name" required />
                        </div>
                        <InputError :errors="errors" field="name"></InputError>
                    </div>
                    <div class="form-control">
                        <label for="email" class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <div class="sk-load">
                            <input id="email" type="email" placeholder="email" class="input input-bordered" v-model="email" required />
                        </div>
                        <InputError :errors="errors" field="email"></InputError>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Mot de passe</span>
                        </label>
                        <div class="sk-load">
                            <input type="password" placeholder="mot de passe" autocomplete="new-password" class="input input-bordered" v-model="password" required />
                        </div>
                        <InputError :errors="errors" field="password"></InputError>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Mot de passe</span>
                        </label>
                        <div class="sk-load">
                            <input type="password" placeholder="mot de passe" autocomplete="new-password" class="input input-bordered" v-model="password_confirmation" required />
                        </div>
                        <InputError :errors="errors" field="password_confirmation"></InputError>
                    </div>
                    <div class="form-control mt-6 text-end">
                        <button type="submit" class="btn btn-primary">Inscription</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
svg {
    display:none;
    position:relative;
    display: block;
    margin: 20px auto;
}
#pen-paper {
    visibility: hidden;
}
</style>