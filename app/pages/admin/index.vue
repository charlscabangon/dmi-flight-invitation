<script setup lang="ts">
import type { Guest } from '@/types/guest';

definePageMeta({
    layout: false,
    middleware: 'admin',
});

// Populated by require-admin-auth middleware before this page ever renders —
// no loading state needed here, and no separate fetch on mount.
const { key } = useBooking();
const guests = useState<Guest[] | null>(key, () => null);

const stats = computed(() => [
    { label: 'Total RSVPs', value: guests.value?.length ?? 0 },
    {
        label: 'Total Passengers',
        value: (guests.value ?? []).reduce((sum, guest) => sum + guest.passenger_count, 0),
    },
]);

const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const handleLogout = async () => {
    await $fetch('/api/admin/logout', { method: 'POST' });
    guests.value = null;
    await navigateTo('/admin/login');
};
</script>

<template>
    <div class="w-full min-h-screen bg-white flex flex-col items-center gap-6 px-4 pt-14 pb-6 sm:gap-8 sm:py-8">
        <h1 class="text-primary-fg">Dmi's Guest List</h1>

        <div class="w-full">
            <div class="w-full flex flex-col gap-5 max-w-5xl mx-auto sm:gap-6">
                <!-- Mini dashboard -->
                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="flex flex-col gap-1 rounded-2xl border-2 border-primary bg-primary-bg-muted/40 px-5 py-4"
                    >
                        <p class="text-label">
                            {{ stat.label }}
                        </p>
                        <p class="text-2xl font-semibold">
                            {{ stat.value }}
                        </p>
                    </div>
                </div>

                <p v-if="!guests?.length" class="text-sm text-primary-fg">No RSVPs yet.</p>

                <div v-else>
                    <div class="overflow-x-auto border-primary shadow-sm rounded-2xl border-2 px-0">
                        <table class="w-full min-w-160 text-left text-sm">
                            <thead>
                                <tr
                                    class="border-b border-primary-fg-muted/15 bg-primary-bg-muted font-sans text-xs uppercase tracking-[0.15em] text-primary-fg"
                                >
                                    <th class="px-4 py-3 sm:px-5 sm:py-4">Name</th>
                                    <th class="px-4 py-3 sm:px-5 sm:py-4">Companions</th>
                                    <th class="text-center px-4 py-3 sm:px-5 sm:py-4">Party Size</th>
                                    <th class="text-right px-4 py-3 sm:px-5 sm:py-4">Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="guest in guests"
                                    :key="guest.id"
                                    class="border-b border-primary-fg-muted/15 transition-colors last:border-0 hover:bg-primary-bg-muted/40"
                                >
                                    <td class="whitespace-nowrap px-4 py-3 sm:px-5 sm:py-4">
                                        {{ guest.passenger_name }}
                                    </td>

                                    <td class="px-4 py-3 sm:px-5 sm:py-4">
                                        <div v-if="guest.companions.length" class="flex flex-nowrap gap-1.5">
                                            <span
                                                v-for="(companion, index) in guest.companions"
                                                :key="index"
                                                class="whitespace-nowrap rounded-full bg-primary-bg-muted px-2.5 py-1 text-xs text-primary-fg"
                                            >
                                                {{ companion }}
                                            </span>
                                        </div>
                                        <span v-else class="whitespace-nowrap text-xs text-primary-fg/50">
                                            -
                                        </span>
                                    </td>

                                    <td class="whitespace-nowrap text-center px-4 py-3 sm:px-5 sm:py-4">
                                        {{ guest.passenger_count }}
                                    </td>

                                    <td class="whitespace-nowrap text-right px-4 py-3 sm:px-5 sm:py-4">
                                        {{ formatDate(guest.created_at) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <ui-button class="w-full! px-6! py-2! text-xs! sm:w-auto!" @click="handleLogout">
            Log Out
        </ui-button>
    </div>
</template>