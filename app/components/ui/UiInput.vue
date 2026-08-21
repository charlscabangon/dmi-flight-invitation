<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
    modelValue: string;
    label?: string;
    placeholder?: string;
    id?: string;
    type?: string;
    autocomplete?: string;
    ariaLabel?: string;
    error?: string | null;
}

defineProps<Props>();

defineEmits<{ 'update:modelValue': [value: string] }>();

const slots = useSlots();
</script>

<template>
    <div class="w-full flex flex-col gap-2">
        <label
            v-if="label"
            :for="id"
            class="font-semibold text-xs text-primary-fg uppercase tracking-widest"
        >
            {{ label }}
        </label>

        <div class="relative">
            <input
                :id="id"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :aria-label="!label ? ariaLabel : undefined"
                :aria-invalid="!!error"
                :class="[
                    'w-full bg-primary-bg-muted text-primary-fg px-4 py-3 rounded-lg',
                    'outline-none transition placeholder:text-primary-fg/40',
                    'focus:border-primary focus:ring-2 focus:ring-primary',
                    slots.trailing ? 'pr-12' : 'pr-4',
                ]"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />

            <div v-if="slots.trailing" class="absolute right-2 top-1/2 -translate-y-1/2">
                <slot name="trailing" />
            </div>
        </div>

        <p v-if="error" class="text-xs text-red-400" role="alert">{{ error }}</p>
    </div>
</template>
