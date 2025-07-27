<script setup>

</script>

<template>
    <div class="container">
        <div class="dot-goey">
            <div class="dot dot-left"></div>
            <div class="dot dot-center"></div>
            <div class="dot dot-right"></div>
            <div class="dot dot-mover"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
html {
    .dot-goey {
        position: relative;
        width: 80px;
        height: 30px;
        margin: 0 auto;
        filter: url(#goo);
    }

    .dot {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #FF4081;
        top: 5px;
    }

    .dot-left {
        left: 0;
    }

    .dot-center {
        left: 30px;
    }

    .dot-right {
        left: 60px;
    }

    .dot-mover {
        left: 0;
        background: #FF4081;
        animation: dot-shuttle 4s infinite ease-out;
    }

    @keyframes dot-shuttle {
        0%, 50%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(60px);
        }
        75% {
            transform: translateX(60px);
        }
    }
}


</style>