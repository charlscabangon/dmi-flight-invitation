import { z } from 'zod';
import { useSupabaseAdmin } from '../utils/supabase';

const guestSchema = z.object({
    passengerName: z.string().trim().min(2, 'Please enter your name'),
    companions: z.array(z.string()).max(3),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const parsed = guestSchema.safeParse(body);

    if (!parsed.success) {
        throw createError({
            statusCode: 400,
            statusMessage: parsed.error.issues[0]?.message ?? 'Invalid booking data',
        });
    }

    const supabase = useSupabaseAdmin();
    const { error } = await supabase.from('guests').insert({
        passenger_name: parsed.data.passengerName,
        companions: parsed.data.companions,
        passenger_count: parsed.data.companions.length + 1,
    });

    if (error) {
        console.error('Failed to save guest booking', error);
        throw createError({ statusCode: 500, statusMessage: 'Could not save booking' });
    }

    return { success: true };
});
