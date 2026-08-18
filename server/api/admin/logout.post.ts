import { ADMIN_COOKIE_NAME } from '../../utils/auth';

export default defineEventHandler((event) => {
    deleteCookie(event, ADMIN_COOKIE_NAME, { path: '/' });
    return { success: true };
});
