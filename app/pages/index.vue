<script setup lang="ts">

const router = useRouter();
const { visible, done } = useAnimation(1000);

const boardNow = () => {
    router.push('/welcome');
};
</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center gap-10 text-center">
        <h1
            :class="['text-display slide-up', visible && 'slide-up-in']"
            :style="{ '--slide-duration': '1000ms' }"
        >
            Your Journey with Dmi Awaits
        </h1>


        <div
            :class="['slide-up', visible && 'slide-up-in']"
            :style="{ '--slide-duration': '500ms' }"
        >
            <reel-number value="DMI001" />
        </div>
        

        <div
            :class="['w-full slide-up', visible && 'slide-up-in']"
            :style="{ '--slide-duration': '500ms' }"
        >
            <ui-button
                :disabled="!done"
                @click="boardNow"
            >
                Board Now
            </ui-button>
        </div>
    </div>
</template>
