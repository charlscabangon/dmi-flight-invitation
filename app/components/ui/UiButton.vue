<script setup lang="ts">

interface Props {
    disabled?: boolean;
    loading?: boolean;
};

withDefaults(
    defineProps<Props>(),
    {
        disabled: false,
        loading: false,
    },
);

defineEmits<{ click: [] }>();
</script>

<template>
    <button
        type="button"
        :class="[
            'group relative w-full overflow-hidden',
            'rounded-full bg-primary-fg px-8 py-4',
            'font-ranchers font-bold text-sm text-white uppercase tracking-[0.2em]',
            'transition-all duration-200 hover:bg-primary-fg/80',
            'cursor-pointer disabled:cursor-not-allowed disabled:bg-primary-fg/50 disabled: disabled:hover:text-dmi-cream/40',
        ]"
        :disabled="disabled || loading"
        @click="$emit('click')"
    >
        <span class="inline-flex items-center justify-center gap-2">
            <slot />
            <ui-spinner v-if="loading" size="ml-1" />
        </span>
    </button>
</template>
