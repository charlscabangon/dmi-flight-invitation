<script setup lang="ts">
import type { Guest } from '@/types/guest';

definePageMeta({
    layout: false,
});

const { key } = useBooking();
const guests = useState<Guest[] | null>(key, () => null);

const password = ref('');
const loginError = ref<string | null>(null);
const isLoggingIn = ref(false);
const isCheckingSession = ref(true);

// If a valid session already exists, skip the form and go straight in.
const checkExistingSession = async () => {
    try {
        guests.value = await $fetch<Guest[]>('/api/guests');
        await navigateTo('/admin');
    } catch {
        isCheckingSession.value = false;
    }
};

const handleLogin = async () => {
    loginError.value = null;
    isLoggingIn.value = true;
    try {
        await $fetch('/api/admin/login', {
            method: 'POST',
            body: { password: password.value },
        });
        await navigateTo('/admin');
    } catch {
        loginError.value = 'Incorrect password.';
    } finally {
        isLoggingIn.value = false;
    }
};

onMounted(checkExistingSession);
</script>

<template>
    <div class="h-screen w-full flex flex-col items-center justify-center gap-10 bg-white px-6">
        <h1 class="text-primary-fg text-center px-4 pt-10 drop-shadow-none">
            Dmi's Guest List
        </h1>

        <ui-spinner v-if="isCheckingSession" size="size-16" />

        <form
            v-else
            class="flex flex-col justify-center items-center gap-8 max-w-sm w-full"
            @submit.prevent="handleLogin"
        >
            <ui-input
                id="admin-password"
                v-model="password"
                label="Password"
                type="password"
                autocomplete="current-password"
                :error="loginError"
            />

            <ui-button type="submit" :loading="isLoggingIn">
                Log In
            </ui-button>
        </form>
    </div>
</template>