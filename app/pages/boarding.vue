<script setup lang="ts">
definePageMeta({
    layout: false,
});

const boardingPassComponent = ref<{ rootEl: HTMLElement | null } | null>(null);

const router = useRouter();
const { hasConfirmedBooking } = useBooking();
const { visible, done } = useAnimation(700);
const { 
    boardingPass,
    isDownloading,
    downloadError,
    downloadBoardingPass 
} = useBoardingPass();

// Guard: if someone lands here without checking in, send them back.
onMounted(() => {
    if (!hasConfirmedBooking.value) {
        router.replace('/check-in');
    }
});
</script>

<template>
    <parallax :plane="false">
        <div class="flex flex-col items-center justify-center gap-8 text-center">
            <h1
                :class="[ 'text-display', visible && 'slide-up-in' ]"
                :style="{ '--slide-duration': '400ms' }"
            >
                Your Boarding Pass is Ready!
            </h1>

            <div
                :class="['w-full place-items-center slide-up', visible && 'slide-up-in']"
                :style="{ '--slide-duration': '700ms' }"
            >
                <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
                <BoardingPass ref="boardingPassComponent" v-bind="boardingPass" />
            </div>

            <p v-if="downloadError" class="text-sm text-red-400" role="alert">
                {{ downloadError }}
            </p>

            <ui-button
                :disabled="!done"
                :loading="isDownloading"
                @click="downloadBoardingPass(boardingPassComponent?.rootEl ?? null)"
            >
                Download Boarding Pass
            </ui-button>
        </div>
    </parallax>

</template>
