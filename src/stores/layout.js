import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    const sidebarIsOpen = ref(false)
    const theme = ref('light')
    const isLoading = ref(false)
    const loadingEls = ref([])

    const toggleSideBar = () => {
        sidebarIsOpen.value = !sidebarIsOpen.value
    }

    const openSideBar = () => {
        sidebarIsOpen.value = true
    }

    const closeSideBar = () => {
        sidebarIsOpen.value = false
    }

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'luxury' : 'light'
        document.querySelector('html').dataset.theme = theme.value
    }

    const setIsLoading = (bool) => {
        if (bool) {
            let els = document.getElementsByClassName('sk-load')
            loadingEls.value = Array.from(els)
            loadingEls.value.forEach(el => {
                el.classList.add('active')
            })
            isLoading.value = true
        } else {
            loadingEls.value.forEach(el => {
                el.classList.remove('active')
                /*
                el.classList.add('fading') // déclenche la transition d'opacité

                // Attends la fin de la transition CSS (événement transitionend)
                el.addEventListener('transitionend', function onTransitionEnd() {
                    el.classList.remove('active')
                    el.classList.remove('fading')
                    el.removeEventListener('transitionend', onTransitionEnd)
                })

                 */
            })
            loadingEls.value = []
            isLoading.value = false
        }
    }

    return {
        sidebarIsOpen,
        toggleSideBar,
        openSideBar,
        closeSideBar,
        theme,
        toggleTheme,
        setIsLoading,
        isLoading
    }
})
