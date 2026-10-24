import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const SUPABASE_PORT = 4174;
const SUPABASE_SPEC = /sharing-vote\.spec\.ts/;
const FAKE_SUPABASE_URL = 'http://localhost:54321';

function devServer(port: number, env: Record<string, string>) {
  return {
    command: `npm run dev -- --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    env,
  };
}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { trace: 'on-first-retry', locale: 'fr-FR' },
  projects: [
    {
      name: 'chromium',
      testIgnore: SUPABASE_SPEC,
      use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${PORT}` },
    },
    {
      name: 'chromium-supabase',
      testMatch: SUPABASE_SPEC,
      use: { ...devices['Desktop Chrome'], baseURL: `http://localhost:${SUPABASE_PORT}` },
    },
  ],
  webServer: [
    devServer(PORT, { VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' }),
    devServer(SUPABASE_PORT, {
      VITE_SUPABASE_URL: FAKE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: 'cle-de-test',
    }),
  ],
});
