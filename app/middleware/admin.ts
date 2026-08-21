import type { Guest } from '@/types/guest';

export default defineNuxtRouteMiddleware(async () => {
    const { key } = useBooking();
    const guests = useState<Guest[] | null>(key, () => null);

    try {
        guests.value = await $fetch<Guest[]>('/api/guests');
    } catch {
        return navigateTo('/admin/login');
    }
});