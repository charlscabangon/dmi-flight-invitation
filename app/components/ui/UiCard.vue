<script setup lang="ts">
interface Props {
    icon: string;
    title: string;
    desc: string;
}

defineProps<Props>();
</script>

<template>
    <article class="h-16 w-xs bg-primary-hover flex items-center gap-2 p-2 rounded-xl ring ring-primary-hover shadow-md">
        <div class="h-12 flex items-center justify-center aspect-square bg-primary-bg p-2 rounded-lg">
            <img :src="icon" :alt="title" class="size-7" />
        </div>

        <div class="space-y-1 pr-3">
            <p class="font-semibold text-sm uppercase text-white">
                {{ title }}
            </p>

            <p class="font-normal text-white text-xs">
                {{ desc }}
            </p>
        </div>
    </article>
</template>
