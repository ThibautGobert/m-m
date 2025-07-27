<script setup>
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

const closeSideBar = () => {
    layoutStore.closeSideBar()
}

</script>

<template>
    <div class="drawer">
        <input id="sidebar" type="checkbox" class="drawer-toggle" :checked="layoutStore.sidebarIsOpen" />
        <div class="drawer-content">
            <!-- Page content here -->

            <router-view />
        </div>
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay" @click="closeSideBar"></label>
            <div class="content">
                <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <!-- Sidebar content here -->
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                    <li>
                        <div style="height: 250vh"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.drawer-side {
    height: 100vh;
    overflow-y: hidden;
    .content {
        height: 100vh;
        overflow-y: auto;
        background-color: oklch(0% 0% 0 / 40%);
    }
    @media (min-width: 1024px) {
        position: sticky;
        top: 54px;
        .drawer-overlay {
            display: none;
        }
    }
    .drawer-overlay {

    }
}
</style>