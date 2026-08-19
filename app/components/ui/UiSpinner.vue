<script setup lang="ts">
export type SpinnerSize =
    | 'size-3'
    | 'size-4'
    | 'size-5'
    | 'size-6'
    | 'size-8'
    | 'size-10'
    | 'size-12'
    | 'size-16'
    | 'size-20';

interface Props {
    size?: SpinnerSize;
}

withDefaults(defineProps<Props>(), {
    size: 'size-12',
});
</script>

<template>
        <svg :class="size" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
            <svg x="5" y="7.5" width="40" height="35" viewBox="0 0 50 50">
                <g class="spinner-blades">
                    <path
                        d="M21.8467 13.125C22.6975 9.58527 21.4332 -0.0237732 19.9701 9.03512e-05C17.2108 -0.0396822 17.7038 13.0614 19.0079 19.5602C17.4971 19.9818 16.3918 21.3659 16.3918 23.0045C16.3918 23.4102 16.4554 23.8 16.5826 24.1659C14.5947 25.0886 12.0978 25.8522 10.4756 26.3215C6.99274 27.3477 -0.696644 33.2499 0.0508246 34.5067C1.39468 36.9169 12.4954 29.9408 17.4653 25.5579C18.1093 26.1863 18.992 26.5761 19.9701 26.5761C21.0436 26.5761 22.0057 26.0988 22.6657 25.3511C24.4628 26.6159 26.3713 28.3897 27.5879 29.567C30.2199 32.0726 39.1737 35.7794 39.8814 34.5067C41.2968 32.1363 29.7031 26.0113 23.4291 23.8954C23.5007 23.6091 23.5404 23.3147 23.5404 23.0045C23.5404 21.2625 22.2999 19.8148 20.6539 19.4966C20.8527 17.3091 21.4332 14.7716 21.8387 13.125"
                    />
                </g>
                <circle cx="19.95" cy="23.2" r="3.7" />
            </svg>
        </svg>
</template>

<style scoped>
    .spinner-blades {
        transform-box: view-box;
        transform-origin: 19.95px 23.2px;
        animation: spin 0.35s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>