import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/axios.js';
import { configureEcho } from '@laravel/echo-vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const emailToBeVerified = ref(null)
    const bearerToken = ref(null)

    const isLoggedIn = computed(() => {
        return user.value && user.value.email_verified_at && bearerToken.value
    })

    const getUser = computed(() => {
        return user.value
    })

    const setUser = (u) => {
        user.value = u
    }

    const setEmailToBeVerified = (email) => {
        emailToBeVerified.value = email
    }

    const setBearerToken = async (token) => {
        bearerToken.value = token
        localStorage.setItem('bearerToken', token)
        configureEcho({
            broadcaster: "reverb",
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT,
            wssPort: import.meta.env.VITE_REVERB_PORT,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
            authEndpoint: 'http://m-m-api.test/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
        });
        api.interceptors.request.use( (config) => {
            config.headers.Authorization =  'Bearer '+ token;
            return config;
        })
        if (!user.value) {
            let res = await api.get('/auth/user')
            user.value = res.data
        }
    }

    const logout = () => {
        bearerToken.value = null
        user.value = null
        localStorage.setItem('bearerToken', null)
    }

    return {
        getUser,
        setUser,
        emailToBeVerified,
        setEmailToBeVerified,
        bearerToken,
        setBearerToken,
        isLoggedIn,
        logout
    }
})
