<template>
    <div ref="container" class="confetti-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ConfettiExplosion',
    props: {
        puissance: {
            type: Number,
            required: true,
            validator: value => value > 0
        },
        timeout: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        // Délai optionnel avant l'explosion
        setTimeout(() => {
            this.lancerConfetti();
        }, this.timeout);
    },
    methods: {
        async lancerConfetti() {
            // Chargement dynamique de la bibliothèque
            if (typeof window.confetti !== 'function') {
                await this.chargerScript();
            }

            const rect = this.$refs.container.getBoundingClientRect();
            const origin = {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight
            };

            // Configuration basée sur la puissance
            const particules = Math.min(this.puissance * 50, 1000);
            const vitesse = Math.min(1 + this.puissance * 0.1, 3);
            const formes = this.genererFormes();

            window.confetti({
                particleCount: particules,
                spread: 70,
                origin,
                //startVelocity: vitesse,
                shapes: formes,
                gravity: 0.8,
                scalar: 0.8 + this.puissance * 0.1
            });
        },
        chargerScript() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        },
        genererFormes() {
            var heart = confetti.shapeFromPath({
                path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
                matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
            });
            var defaults = {
                scalar: 2,
                spread: 180,
                particleCount: 30,
                origin: { y: -0.1 },
                startVelocity: -35
            };

            confetti({
                ...defaults,
                shapes: [heart],
                colors: ['#f93963', '#a10864', '#ee0b93']
            });

            // Variation des formes en fonction de la puissance
            const formes = ['circle', 'square'];
            if (this.puissance > 3) formes.push('star');
            if (this.puissance > 5) formes.push('heart');
            return formes;
        }
    }
}
</script>

<style scoped>
.confetti-container {
    display: inline-block;
    position: relative;
}
</style>