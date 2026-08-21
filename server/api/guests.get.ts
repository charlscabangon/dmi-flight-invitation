import { requireAdmin } from '../utils/require-admin';
import { useSupabaseAdmin } from '../utils/supabase';
import type { Guest } from '~/types/guest';

export default defineEventHandler(async (event): Promise<Guest[]> => {
    requireAdmin(event);

    const supabase = useSupabaseAdmin();
    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to load guests', error);
        throw createError({ statusCode: 500, statusMessage: 'Could not load guests' });
    }

    return data as Guest[];
});
