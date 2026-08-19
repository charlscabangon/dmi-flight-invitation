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
    <main class="bg-white w-full min-h-screen">
        <section
            :class="[
                'slide-up',
                'h-70 flex flex-col justify-center items-center text-center',
                'bg-gradient-sky rounded-b-full overflow-hidden',
                visible && 'slide-up-in',
            ]"
        >
            <slot name="header" />
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
