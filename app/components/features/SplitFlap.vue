<script setup lang="ts">
import gsap from 'gsap';

const props = defineProps<{
    value: string | number;
    delay?: number;
}>();

const displayValue = ref('–');
const element = ref<HTMLElement | null>(null);

// A small pool of glyphs to spin through before landing — purely
// decorative filler so the mechanical reel effect reads clearly.
const GLYPH_POOL = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const randomGlyph = () => {
    return GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)];
}

const spin = () => {
    const target = String(props.value);

    const ticks = 10;
    const tl = gsap.timeline({ delay: props.delay ?? 0 });

    for (let i = 0; i < ticks; i++) {
        tl.call(
            () => {
                displayValue.value = randomGlyph();
            },
            undefined,
            i * 0.045 * (1 + i / ticks),
        ); // decelerate
    }

    tl.call(
        () => {
            displayValue.value = target;
        },
        undefined,
        '+=0.12',
    );

    if (element.value) {
        tl.fromTo(
            element.value,
            { y: -6, opacity: 0.6 },
            { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            '<',
        );
    }
}

onMounted(spin);
watch(() => props.value, spin);
</script>

<template>
    <span
        ref="element"
        :class="[
            'inline-flex min-w-[2.5ch] items-center justify-center',
            'font-sans text-lg font-black uppercase tabular-nums text-primary-fg',
            'rounded-md bg-white/60 border border-white border-2 px-2 py-1 shadow-inner',
        ]"
    >
        {{ displayValue }}
    </span>
</template>
