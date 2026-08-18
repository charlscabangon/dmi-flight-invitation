import { ADMIN_COOKIE_NAME, adminToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { password } = await readBody<{ password?: string }>(event);

    if (!config.adminPassword) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Admin password is not configured on the server.',
        });
    }

    if (!password || password !== config.adminPassword) {
        throw createError({ statusCode: 401, statusMessage: 'Incorrect password' });
    }

    setCookie(event, ADMIN_COOKIE_NAME, adminToken(password), {
        httpOnly: true,
        sameSite: 'strict',
        secure: !import.meta.dev,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
});
