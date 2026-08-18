import type { H3Event } from 'h3';
import { ADMIN_COOKIE_NAME, adminToken } from './auth';

/**
 * Throws a 401 unless the request carries the admin cookie matching the
 * configured NUXT_ADMIN_PASSWORD. Call at the top of any server route
 * that should only be reachable after /admin login.
 */
export function requireAdmin(event: H3Event) {
    const config = useRuntimeConfig();
    const cookie = getCookie(event, ADMIN_COOKIE_NAME);

    if (!config.adminPassword) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Admin password is not configured on the server.',
        });
    }

    if (!cookie || cookie !== adminToken(config.adminPassword)) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }
}
