import { createHash } from 'node:crypto';

/**
 * Derives a stable, opaque token from the admin password. Used as the
 * cookie value so the plaintext password itself is never written to a
 * cookie, only this one-way hash of it.
 */
export function adminToken(password: string): string {
    return createHash('sha256').update(password).digest('hex');
}

export const ADMIN_COOKIE_NAME = 'dmi_admin';
