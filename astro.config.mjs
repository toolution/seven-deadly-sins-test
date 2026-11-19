import { defineConfig } from 'astro/config';
export default defineConfig({site: process.env.SITE_URL || 'https://7deadlysinstestfree.com', trailingSlash:'always', devToolbar:{enabled:false}});
