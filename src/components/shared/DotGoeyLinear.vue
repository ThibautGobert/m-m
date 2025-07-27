<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

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

onMounted(() => {
    instanceId.value = 'goey-' + Math.random().toString(36).substr(2, 9);
    updateAnimationStyle();
});

watch(() => props.count, updateAnimationStyle);
watch(() => props.duration, updateAnimationStyle);

let styleElement = null;

function updateAnimationStyle() {
    if (styleElement) {
        document.head.removeChild(styleElement);
        styleElement = null;
    }
    styleElement = document.createElement('style');
    styleElement.dataset.goeyInstance = instanceId.value;

    // Modification clé ici : nouvelle animation de 0% à 100%
    styleElement.textContent = `
    @keyframes dot-shuttle-${instanceId.value} {
      0% {
        transform: translate(0, -50%);
      }
      100% {
        transform: translate(${maxPosition.value}px, -50%);
      }
    }
    .dot-mover-${instanceId.value} {
      animation: dot-shuttle-${instanceId.value} ${props.duration}s infinite linear;
      animation-fill-mode: forwards;
    }
  `;
    document.head.appendChild(styleElement);
}

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

            <!-- Point mobile -->
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
/* Ajout de la règle pour gérer la transition invisible */
.dot-mover {
    left: 0;
    animation-direction: normal;
}

/* Crée l'effet de retour instantané */
.dot-mover::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
}
</style>