<script setup lang="ts">

const router = useRouter();
const { visible } = useAnimation();

const { isPlaying, play } = useTakeoffSequence({
    durationMs: 8000,
    onComplete: () => router.push('/flight-details'),
});

onMounted(() => {
    play();
});

</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center gap-2 text-center">
        <h1
            :class="['text-display slide-up', visible && 'slide-up-in']"
        >
            Welcome Aboard!
        </h1>

        <div class="flex flex-col">
            <p 
                :class="['slide-up', visible && 'slide-up-in']"
                :style="{ '--slide-duration': '500ms' }"
            >
                Dmi is setting off for his next destination,
            </p>
            <p
                :class="['slide-up', visible && 'slide-up-in']"
                :style="{ '--slide-duration': '700ms' }"
            >
                and you're invited along for the ride!
            </p>
        </div>

        <div
            v-if="isPlaying"
            :class="['slide-up mt-2', visible && 'slide-up-in']"
            :style="{ '--slide-duration': '900ms' }"
        >
            <ui-spinner  size="size-20" />
        </div>
    </div>
</template>
