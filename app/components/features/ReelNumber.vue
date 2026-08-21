<script setup lang="ts">
const props = defineProps<{
    value: string | number; 
    startDelay?: number; // Stagger offset (seconds)
}>();

const characters = computed(() => String(props.value).split(''));
</script>

<template>
    <div class="flex gap-1">
        <split-flap
            v-for="(char, index) in characters"
            :key="`${char}-${index}`"
            :value="char"
            :delay="(props.startDelay ?? 0) + index * 0.08"
        />
    </div>
</template>
