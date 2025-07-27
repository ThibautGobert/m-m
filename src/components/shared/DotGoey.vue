<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
    count: {
        type: Number,
        default: 3,
        validator: (value) => value >= 2 && value <= 10
    },
    duration: {
        type: Number,
        default: 4,
    },
    fixedDotColor: {
        type: String,
        default: '#FF4081'
    },
    movingDotColor: {
        type: String,
        default: '#FF4081'
    },
    fixedDotSize: {
        type: Number,
        default: 20,
    },
    movingDotSize: {
        type: Number,
        default: 20,
    },
});

const instanceId = ref('');
const maxPosition = computed(() => (props.count - 1) * 30);

// Générer un ID unique pour chaque instance
onMounted(() => {
    instanceId.value = 'goey-' + Math.random().toString(36).substr(2, 9);
    updateAnimationStyle();
});

// Mettre à jour le style lorsque le nombre de points change
watch(() => props.count, updateAnimationStyle);

let styleElement = null;

function updateAnimationStyle() {
    // Supprimer l'ancien style s'il existe
    if (styleElement) {
        document.head.removeChild(styleElement);
        styleElement = null;
    }
    styleElement = document.createElement('style');
    styleElement.dataset.goeyInstance = instanceId.value;

    // CSS dynamique
    styleElement.textContent = `
    @keyframes dot-shuttle-${instanceId.value} {
      0%, 50%, 100% { transform: translate(0, -50%); }
      25%, 75% { transform: translate(${maxPosition.value}px, -50%); }
    }
    .dot-mover-${instanceId.value} {
      animation: dot-shuttle-${instanceId.value} ${props.duration}s infinite ease-out;
    }
  `;
    document.head.appendChild(styleElement);
}

// Nettoyer le style lors du démontage du composant
onUnmounted(() => {
    if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
    }
});
</script>

<template>
    <div class="container">
        <div
            class="dot-goey"
            :style="{ width: `${maxPosition + 20}px` }"
        >
            <!-- Points fixes -->
            <div
                v-for="i in count"
                :key="`fixed-${i}`"
                class="dot"
                :style="{
                    left: `${(i - 1) * 30}px`,
                    backgroundColor: props.fixedDotColor,
                    width: props.fixedDotSize + 'px',
                    height: props.fixedDotSize + 'px',
                }"
            />

            <!-- Point mobile avec classe d'animation dynamique -->
            <div
                class="dot dot-mover"
                :class="`dot-mover-${instanceId}`"
                :style="{
                    backgroundColor: props.movingDotColor,
                    width: props.movingDotSize + 'px',
                    height: props.movingDotSize + 'px',
                }"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
}

.dot-goey {
    position: relative;
    height: 50px;
    margin: 0 auto;
    filter: url(#goo);
}

.dot {
    position: absolute;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
}

.dot-mover {
    left: 0;
}
</style>