<script setup lang="ts">

interface Props {
    icon: string;
    title: string;
    desc: string;
}

defineProps<Props>();

</script>

<template>
    <article class="h-16 w-xs bg-primary flex items-center gap-2 p-1 rounded-xl">
        <div class="h-full aspect-square bg-primary-bg p-3 rounded-lg">
            <img :src="icon" :alt="title" class="size-8"/>
        </div>

        <div class="space-y-2 pr-3">
            <p class="font-semibold text-base uppercase text-white">
                {{ title }}
            </p>

            <p class="text-white text-sm">
                {{ desc }}
            </p>
        </div>
    </article>
</template>