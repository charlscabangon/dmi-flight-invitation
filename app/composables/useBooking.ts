import { z } from 'zod';

const bookingSchema = z.object({
    passengerName: z.string().trim().min(2, 'Please enter your name'),
    companions: z.array(z.string()).max(3),
});

const MAX_COMPANIONS = 3;

// Module-level refs so every component sees the same shared state —
// Intentionally lightweight, no Pinia required.
const passengerName = ref('');
const companions = ref<string[]>([]);
const isSubmitted = ref(false);

export function useBooking() {
    // Persist across refreshes for the duration of the browser tab.
    if (import.meta.client) {
        const stored = useSessionStorage('dmi001', {
            passengerName: '',
            companions: [] as string[],
            isSubmitted: false,
        });

        // Hydrate local refs once on first use.
        if (!passengerName.value && stored.value.passengerName) {
            passengerName.value = stored.value.passengerName;
            companions.value = stored.value.companions;
            isSubmitted.value = stored.value.isSubmitted;
        }

        watch(
            [passengerName, companions, isSubmitted],
            () => {
                stored.value = {
                    passengerName: passengerName.value,
                    companions: companions.value,
                    isSubmitted: isSubmitted.value,
                };
            },
            { deep: true },
        );
    }

    const companionCount = computed(() => companions.value.length);

    const addCompanion = () => {
        if (companionCount.value >= MAX_COMPANIONS) return;
        companions.value.push('');
    }

    const removeCompanion = (index: number) => {
        companions.value.splice(index, 1);
    }

    const validate = () => {
        return bookingSchema.safeParse({
            passengerName: passengerName.value,
            companions: companions.value,
        });
    }

    const submitBooking = () => {
        const result = validate();
        if (!result.success) return result;

        passengerName.value = result.data.passengerName;
        isSubmitted.value = true;
        return result;
    }

    const reset = () => {
        passengerName.value = '';
        companions.value = [''];
        isSubmitted.value = false;
    }

    return {
        passengerName,
        companions,
        companionCount,
        maxCompanion: MAX_COMPANIONS,
        addCompanion,
        removeCompanion,
        isSubmitted,
        submitBooking,
        reset,
    };
}
