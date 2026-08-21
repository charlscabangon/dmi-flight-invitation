<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        contentAnimated?: boolean;
    }>(),
    {
        contentAnimated: true,
    },
);

const { visible } = useAnimation();
</script>

<template>
    <main class="pattern-dots bg-white w-full min-h-screen overflow-hidden">
        <section
            :class="[
                'slide-up',
                'h-70 flex flex-col justify-center items-center text-center',
                'bg-gradient-sky rounded-b-full shadow-sm overflow-hidden',
                visible && 'slide-up-in',
            ]"
        >
            <slot name="header" />
            
            <img
                src="assets/icons/display/map.svg"
                class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-160 opacity-10"
            />
        </section>

        <section
            :class="[
                'place-items-center',
                props.contentAnimated && 'slide-up',
                props.contentAnimated && visible && 'slide-up-in',
            ]"
            :style="{ '--slide-duration': '700ms', '--slide-delay': '150ms' }"
        >
            <slot name="content" />
        </section>
    </main>
</template>
