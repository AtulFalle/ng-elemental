import { join } from 'node:path';
import { defineConfig } from 'vitest/config';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/cli',
  plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  test: {
    name: 'cli',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    globalSetup: join(__dirname, '../../tools/start-local-registry.ts'),
    globalTeardown: join(__dirname, '../../tools/stop-local-registry.ts'),
    testTimeout: 120_000,
    hookTimeout: 180_000,
    teardownTimeout: 10_000,
    coverage: {
      reportsDirectory: '../../coverage/packages/cli',
      provider: 'v8' as const,
    },
  },
}));
