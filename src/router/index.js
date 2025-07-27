import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                translationConcept: 'page_home',
            },
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Auth/LoginView.vue'),
        },
        {
            path: '/register',
            name: 'register',
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Auth/RegisterView.vue'),
        },
        {
            path: '/email-verification-sent',
            name: 'emailVerificationSent',
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Auth/EmailVerificationSentView.vue'),
        },
        {
            path: '/verify-email',
            name: 'verifyEmail',
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Auth/VerifyEmailView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/conversations',
            name: 'conversations',
            meta: { requiresAuth: true },
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Conversation/Index.vue'),
        },
        {
            path: '/conversations/:userUuid/new',
            name: 'newConversations',
            meta: { requiresAuth: true },
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Conversation/New.vue'),
        },
        {
            path: '/conversations/:conversationUuid/show',
            name: 'showConversations',
            meta: { requiresAuth: true },
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Conversation/Show.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            meta: { requiresAuth: true },
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Auth/Profile.vue'),
        },
        {
            path: '/user/:userUuid/profile',
            name: 'profile',
            meta: { requiresAuth: true },
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Auth/Profile.vue'),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const { useAuthStore } = await import('@/stores/auth')
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router;
