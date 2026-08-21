<script setup lang="ts">
import airplane from '@/assets/icons/ui/ic-airplane.svg';
import calendar from '@/assets/icons/ui/ic-calendar.svg';
import clock from '@/assets/icons/ui/ic-clock.svg';
import location from '@/assets/icons/ui/ic-location.svg';

definePageMeta({
    layout: false,
});

const router = useRouter();
const { visible } = useAnimation();

const proceedToCheckIn = () => {
    router.push('/check-in');
};

const details = [
    {
        title: 'Flight',
        icon: airplane,
        desc: 'DMI001',
    },
    {
        title: 'Date',
        icon: calendar,
        desc: 'August 28, 2026',
    },
    {
        title: 'Time',
        icon: clock,
        desc: '3:00PM',
    },
    {
        title: 'Location',
        icon: location,
        desc: 'Cabangon\'s Residence, Joyao-joyao, Numancia, Aklan',
    },
]
</script>

<template>
    <info-layout :content-animated="false">
        <template #header>
            <h1 class="text-display">Flight Details</h1>
            <p>Here's everything you need to know before takeoff</p>
        </template>

        <template #content>
            <div class="flex flex-col gap-6 pt-6">
                <div class="space-y-2">
                    <ui-card
                        v-for="(detail, index) in details"
                        :key="index"
                        :title="detail.title"
                        :icon="detail.icon"
                        :desc="detail.desc"
                        class="slide-up"
                        :class="{ 'slide-up-in': visible }"
                        :style="{ '--slide-delay': `${index * 150}ms` }"
                    />
                </div>

                <ui-button
                    class="slide-up"
                    :class="{ 'slide-up-in': visible }"
                    :style="{ '--slide-delay': `${details.length * 150}ms` }"
                    @click="proceedToCheckIn"
                >
                    Proceed to check-in
                </ui-button>
            </div>
        </template>
    </info-layout>
</template>
