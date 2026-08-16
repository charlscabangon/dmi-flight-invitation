// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-01-01',
    devtools: { enabled: true },

    srcDir: 'app/',

    modules: ['@nuxt/eslint', '@vueuse/nuxt'],

    vite: {
        plugins: [tailwindcss()],
    },

    css: ['~/assets/css/main.css'],

    components: [{ path: '~/components', pathPrefix: false }],

    app: {
        head: {
            title: "Dmi's World Tour",
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content: 'Your journey with Dmi awaits. Board now.',
                },
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    typescript: {
        strict: true,
    },

    // Server-only by default (no `public` nesting) — these never reach the
    // browser bundle. Only server/api/* routes can read them via
    // useRuntimeConfig(). Set the matching NUXT_* env vars in .env locally
    // and in the Vercel project settings for deployment.
    runtimeConfig: {
        supabaseUrl: '', // NUXT_SUPABASE_URL
        supabaseSecretKey: '', // NUXT_SUPABASE_SECRET_KEY
        adminPassword: '', // NUXT_ADMIN_PASSWORD
    },
});