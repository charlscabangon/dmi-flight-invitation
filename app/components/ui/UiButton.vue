<script setup lang="ts">
interface Props {
    disabled?: boolean;
    loading?: boolean;
}

withDefaults(defineProps<Props>(), {
    disabled: false,
    loading: false,
});

defineEmits<{ click: [] }>();
</script>

<template>
    <button
        type="button"
        :class="[
            'group relative w-full h-14 px-8',
            'bg-primary-fg rounded-full ring ring-primary-fg-muted overflow-hidden',
            'font-sans font-bold text-sm text-white uppercase tracking-widest',
            'transition-all duration-200 hover:bg-primary-fg-hover cursor-pointer',
            'disabled:cursor-not-allowed disabled:bg-primary-fg-muted',
        ]"
        :disabled="disabled || loading"
        @click="$emit('click')"
    >
        <span class="inline-flex items-center justify-center gap-2 whitespace-nowrap">
            <slot />
            <ui-spinner
                v-if="loading"
                size="size-10"
                class="text-white shrink-0"
                label="Loading"
            />
        </span>
    </button>
</template>