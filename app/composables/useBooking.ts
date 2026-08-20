import { z } from 'zod';

const bookingSchema = z.object({
    passengerName: z.string().trim().min(2, 'Please enter your name'),
    companions: z.array(z.string()).max(3),
});

export interface ConfirmedBooking {
    passengerName: string;
    companions: string[];
}

const MAX_COMPANIONS = 3;
const STORAGE_KEY = 'dmi001';

/**
 * Module-level, single-instance state
 * DRAFT: what the check-in FORM is bound to. Cleared immediately on a 
 * successful submit, so the form is blank if the guest navigates back.
 */
const passengerName = ref('');
const companions = ref<string[]>([]);

/**
 * CONFIRMED: the last successfully submitted booking. This is what the
 * boarding pass renders from. It changes ONLY on a new successful submit
 * never as a side effect of the draft being cleared, navigated away
 * from, or the pass being downloaded.
*/
const confirmedBooking = ref<ConfirmedBooking | null>(null);

// Must run exactly once per app load, not once per call to useBooking().
if (import.meta.client) {
    const stored = useSessionStorage(STORAGE_KEY, {
        passengerName: '',
        companions: [] as string[],
        confirmedBooking: null as ConfirmedBooking | null,
    });

    passengerName.value = stored.value.passengerName;
    companions.value = stored.value.companions;
    confirmedBooking.value = stored.value.confirmedBooking;

    watch(
        [passengerName, companions, confirmedBooking],
        () => {
            stored.value = {
                passengerName: passengerName.value,
                companions: companions.value,
                confirmedBooking: confirmedBooking.value,
            };
        },
        { deep: true },
    );
}

export function useBooking() {
    const companionCount = computed(() => companions.value.length);
    const hasConfirmedBooking = computed(() => confirmedBooking.value !== null);

    const addCompanion = () => {
        if (companionCount.value >= MAX_COMPANIONS) return;
        companions.value.push('');
    };

    const removeCompanion = (index: number) => {
        companions.value.splice(index, 1);
    };

    const validate = () => {
        return bookingSchema.safeParse({
            passengerName: passengerName.value,
            companions: companions.value,
        });
    };

    /**
     * Validates the draft. On success: saves a snapshot as the new
     * confirmed booking (what /boarding-pass will show), then clears the
     * draft form fields right away — so a later visit to /check-in starts
     * blank, while /boarding-pass keeps showing this confirmed snapshot
     * regardless of what happens to the draft afterward.
     */
    const submitBooking = () => {
        const result = validate();
        if (!result.success) return result;

        confirmedBooking.value = {
            passengerName: result.data.passengerName,
            companions: result.data.companions.map((c) => c.trim()).filter(Boolean),
        };

        passengerName.value = '';
        companions.value = [''];

        return result;
    };

    // Fully clears both the draft form and the confirmed booking.
    const reset = () => {
        passengerName.value = '';
        companions.value = [''];
        confirmedBooking.value = null;
    };

    return {
        passengerName,
        companions,
        companionCount,
        maxCompanion: MAX_COMPANIONS,
        addCompanion,
        removeCompanion,
        confirmedBooking,
        hasConfirmedBooking,
        submitBooking,
        reset,
    };
}