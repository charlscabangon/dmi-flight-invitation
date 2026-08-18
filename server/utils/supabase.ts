import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client authenticated with the secret key.
 * This bypasses Row Level Security, so it must never be imported from
 * anything that ships to the browser — only from files under server/.
 */
export function useSupabaseAdmin(): SupabaseClient {
    if (client) return client;

    const config = useRuntimeConfig();

    if (!config.supabaseUrl || !config.supabaseSecretKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Supabase is not configured on the server.',
        });
    }

    client = createClient(config.supabaseUrl, config.supabaseSecretKey, {
        auth: { persistSession: false },
    });

    return client;
}
