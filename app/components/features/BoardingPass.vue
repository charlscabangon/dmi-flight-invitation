<script setup lang="ts">

interface BoardingPassData {
    passengerName: string;
    companions: string[];
}

defineProps<BoardingPassData>();

const rootEl = ref<HTMLElement | null>(null);
defineExpose({ rootEl });


const barWidths = ['w-0.5', 'w-1', 'w-1.5'];
const bars = Array.from({ length: 40 }, () => barWidths[Math.floor(Math.random() * barWidths.length)]);
</script>


<template>
    <div
        ref="rootEl"
        :class="[
            'relative w-full max-w-sm flex flex-col overflow-hidden',
            'bg-[#ffffff] text-primary-fg rounded-2xl shadow-xl'
        ]"
        style="aspect-ratio: 3 / 4"
    >
        <!-- Header -->
        <div class="shrink-0 bg-primary-fg border-b-4 border-primary w-full py-3">
            <h1 class="font-sans font-black text-xl text-white text-center tracking-widest">
                Flight DMI001
            </h1>
        </div>

        <!-- Content. -->
        <div class="relative z-10 flex-1 min-h-0 flex flex-col gap-1 sm:gap-3 text-left px-6 pt-4">
            <!-- Passenger Information -->
            <div class="shrink-0 flex justify-between gap-4 border-b-2 border-primary-fg-muted/20 pb-3">
                <div class="min-w-0">
                    <p class="text-label">
                        Passenger
                    </p>
                    <p class="text-desc">
                        {{ passengerName || 'Guest' }}
                    </p>
                </div>

                <div class="shrink-0">
                    <p class="text-label">
                        Companions
                    </p>
                    <p class="text-desc">
                        {{ companions.length }}
                    </p>
                </div>
            </div>

            <!-- Destination -->
            <div class="shrink-0 text-left">
                <p class="text-label">
                    Destination
                </p>
                <p class="font-bold text-xl uppercase tracking-normal leading-tight">
                    Elian Dmitri's 1st Birthday
                </p>
            </div>

            <!-- Flight Details -->
            <div class="relative z-10 shrink-0 flex flex-col gap-3 text-left">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <p class="text-label">
                            Date
                        </p>
                        <p class="text-desc">
                            August 29, 2026
                        </p>
                    </div>

                    <div>
                        <p class="text-label">
                            Boarding
                        </p>
                        <p class="text-desc">
                            3:00PM
                        </p>
                    </div>
                </div>

                <!-- Location -->
                <div class="flex flex-col">
                    <p class="text-label">
                        Location
                    </p>
                    <img
                        src="assets/images/location.webp"
                        alt="Location"
                        class="shrink-0 size-20 sm:size-23 md:size-25 rounded-lg object-cover -ml-1 mr-4"
                    >
                </div>
            </div>
        </div>

        <!-- Perforation -->
        <div class="relative z-10 shrink-0 flex items-center px-4">
            <div class="absolute -left-3 h-6 w-6 rounded-full bg-primary-bg" />
            <div class="w-full border-t-2 border-dashed border-primary-fg-muted/30" />
            <div class="absolute -right-3 h-6 w-6 rounded-full bg-primary-bg" />
        </div>

        <!-- Stub -->
        <div class="relative z-10 shrink-0 flex flex-col gap-2 px-6 py-4">
            <div class="flex justify-between gap-4 text-left">
                <div>
                    <p class="text-label">
                        Flight
                    </p>
                    <p class="text-desc">
                        DMI001
                    </p>
                </div>

                <div>
                    <p class="text-label">
                        Date
                    </p>
                    <p class="text-desc">
                        08 29 26
                    </p>
                </div>

                <div>
                    <p class="text-label">
                        Boarding
                    </p>
                    <p class="text-desc">
                        3:00PM
                    </p>
                </div>
            </div>

            <!-- Barcode -->
            <div class="w-full flex items-end justify-between">
                <span
                    v-for="(width, index) in bars"
                    :key="index"
                    class="bg-primary-fg h-8"
                    :class="width"
                />
            </div>
        </div>

        <img
            src="assets/icons/display/stamp.svg"
            class="absolute z-5 top-65 left-35 size-30 opacity-10"
        />

        <img
            src="assets/icons/display/map.svg"
            class="absolute top-45 right-3 size-60 opacity-10"
        />
    </div>
</template>