<script setup lang="ts">
import gsap from 'gsap';

import airplaneIcon from '~/assets/icons/display/airplane.svg';
import cloud01 from '~/assets/icons/display/cloud-01.svg';
import cloud02 from '~/assets/icons/display/cloud-02.svg';
import cloud03 from '~/assets/icons/display/cloud-03.svg';
import cloud04 from '~/assets/icons/display/cloud-04.svg';
import cloud05 from '~/assets/icons/display/cloud-05.svg';
import cloud06 from '~/assets/icons/display/cloud-06.svg';

const CLOUD_POOL = [cloud01, cloud02, cloud03, cloud04, cloud05, cloud06];

interface CloudLayerConfig {
    scale: number; // 1 = full size
    opacity: number; // Layer opacity, 0-1
    duration: number; // Lower = faster
    count: number;
    verticalRange: [number, number]; // Vertical spread as a % range [min, max] of container height
}

const props = withDefaults(
    defineProps<{
        plane?: boolean;
        planeSize?: string;
        planeOffsetX?: string;
        planeOffsetY?: string;
        floatAmplitude?: number;
        floatDuration?: number;
        cloudBaseSize?: string;
        layers?: CloudLayerConfig[];
    }>(),
    {
        plane: true,
        planeSize: 'clamp(200px, 38vw, 230px)',
        planeOffsetX: '0px',
        planeOffsetY: '-200px',
        floatAmplitude: 10,
        floatDuration: 3.2,
        cloudBaseSize: '40vw',
        layers: () => [
            {
                scale: 1,
                opacity: 0.5,
                duration: 24,
                count: 10,
                verticalRange: [1, 35],
            },
            {
                scale: 1.5,
                opacity: 0.5,
                duration: 16,
                count: 4,
                verticalRange: [55, 85],
            },
            {
                scale: 2,
                opacity: 1,
                duration: 8,
                count: 4,
                verticalRange: [55, 92],
            },
        ],
    },
);

const rootEl = ref<HTMLElement | null>(null);
const planeInner = ref<HTMLElement | null>(null);
const trackRefs = ref<(HTMLElement | null)[]>([]);

let ctx: gsap.Context | undefined;

// Deterministic across server and client to avoid hydration mismatches.
const seededRandom = (seed: number): number => {
    const x = Math.sin(seed * 9973.1) * 43758.5453;

    return x - Math.floor(x);
};

const cloudLayers = computed(() =>
    props.layers.map((layer, layerIndex) => {
        const [rangeMin, rangeMax] = layer.verticalRange;

        const baseItems = Array.from({ length: layer.count }, (_, itemIndex) => {
            const seed = layerIndex * 97 + itemIndex * 13;

            return {
                src: CLOUD_POOL[Math.floor(seededRandom(seed) * CLOUD_POOL.length)],
                leftWithinStrip: seededRandom(seed + 1) * 100,
                top: rangeMin + seededRandom(seed + 2) * (rangeMax - rangeMin),
                sizeVariance: 0.85 + seededRandom(seed + 3) * 0.3,
            };
        });

        const items = [0, 1].flatMap((stripIndex) =>
            baseItems.map((item, itemIndex) => ({
                ...item,
                key: `${stripIndex}-${itemIndex}`,
                leftInTrack: stripIndex * 50 + item.leftWithinStrip * 0.5,
            })),
        );

        return {
            ...layer,
            items,
        };
    }),
);

const setTrackRef = (el: Element | null, index: number) => {
    trackRefs.value[index] = el as HTMLElement | null;
};

onMounted(() => {
    // Scopes GSAP animations for automatic cleanup.
    ctx = gsap.context(() => {
        trackRefs.value.forEach((track, index) => {
            if (!track) return;

            gsap.to(track, {
                xPercent: -50,
                duration: props.layers[index]?.duration ?? 60,
                ease: 'none',
                repeat: -1,
            });
        });

        if (planeInner.value) {
            gsap.to(planeInner.value, {
                y: props.floatAmplitude,
                rotation: 1.5,
                duration: props.floatDuration,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        }
    }, rootEl.value ?? undefined);
});

onBeforeUnmount(() => {
    ctx?.revert();
});
</script>

<template>
    <div ref="rootEl" class="relative isolate min-h-screen overflow-hidden">
        <div
            class="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
            :style="{ '--cloud-base': cloudBaseSize }"
        >
            <div
                v-for="(layer, layerIndex) in cloudLayers"
                :key="layerIndex"
                class="absolute inset-0"
                :style="{ opacity: layer.opacity }"
            >
                <div
                    :ref="(el) => setTrackRef(el as Element | null, layerIndex)"
                    class="absolute inset-y-0 left-0"
                    style="width: 200%; will-change: transform"
                >
                    <img
                        v-for="item in layer.items"
                        :key="item.key"
                        :src="item.src"
                        alt=""
                        loading="eager"
                        decoding="async"
                        draggable="false"
                        class="absolute select-none"
                        :style="{
                            left: item.leftInTrack + '%',
                            top: item.top + '%',
                            width: `calc(var(--cloud-base) * ${layer.scale * item.sizeVariance})`,
                            transform: 'translate(-50%, -50%)',
                        }"
                    />
                </div>
            </div>

            <div
                v-if="plane"
                class="absolute left-1/2 top-1/2"
                :style="{
                    transform: `translate(calc(-50% + ${planeOffsetX}), calc(-50% + ${planeOffsetY}))`,
                }"
            >
                <img
                    ref="planeInner"
                    :src="airplaneIcon"
                    alt=""
                    loading="eager"
                    decoding="async"
                    draggable="false"
                    class="select-none"
                    :style="{ width: planeSize, height: 'auto', willChange: 'transform' }"
                />
            </div>
        </div>

        <!-- Foreground content -->
        <div
            class="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12 sm:max-w-lg"
        >
            <slot />
        </div>
    </div>
</template>
