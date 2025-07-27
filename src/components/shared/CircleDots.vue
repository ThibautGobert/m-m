<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
    dotCount: {
        type: Number,
        default: 8
    },
    circleDiameter: {
        type: Number,
        default: 160
    },
    dotSize: {
        type: Number,
        default: 20
    },
    duration: {
        type: Number,
        default: 2
    }
});

const radius = computed(() => props.circleDiameter / 2);
const containerSize = computed(() => props.circleDiameter + props.dotSize * 2);

const animationName = ref(`orbit_${Math.random().toString(36).substr(2, 8)}`);

onMounted(() => {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes ${animationName.value} {
      0% {
        transform: translate(-50%, -50%) rotate(0deg) translateX(${radius.value}px) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg) translateX(${radius.value}px) rotate(-360deg);
      }
    }
  `;
    style.id = `style-${animationName.value}`;
    document.head.appendChild(style);
});

onBeforeUnmount(() => {
    const style = document.getElementById(`style-${animationName.value}`);
    if (style) document.head.removeChild(style);
});

const getFixedDotStyle = (index) => {
    const angle = (360 / props.dotCount) * index;
    return {
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius.value}px) rotate(-${angle}deg)`,
        width: `${props.dotSize}px`,
        height: `${props.dotSize}px`
    };
};

const movingDotStyle = computed(() => ({
    width: `${props.dotSize}px`,
    height: `${props.dotSize}px`,
    animation: `${animationName.value} ${props.duration}s linear infinite`
}));
</script>

<template>
    <div
        class="circle-loader-container"
        :style="{
      width: `${containerSize}px`,
      height: `${containerSize}px`
    }"
    >
        <div class="loader">
            <div class="fixed-dots">
                <div
                    v-for="i in dotCount"
                    :key="i"
                    class="fixed-dot"
                    :style="getFixedDotStyle(i)"
                />
            </div>
            <div class="moving-dot" :style="movingDotStyle"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.circle-loader-container {
    margin: 50px auto;
    filter: url('#goo');
    position: relative;
}

.loader {
    position: relative;
    width: 100%;
    height: 100%;
}

.fixed-dots {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.fixed-dot {
    position: absolute;
    background: #FF4081;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.moving-dot {
    position: absolute;
    background: #FF4081;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
</style>