import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests',testMatch:'**/*.spec.ts',workers:1,use:{baseURL:process.env.TEST_URL||'http://127.0.0.1:4323',browserName:'chromium',launchOptions:{executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'},headless:true},reporter:'list',outputDir:'work/test-results'});
