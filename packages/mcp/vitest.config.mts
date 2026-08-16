import { defineConfig } from 'vitest/config';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const root = import.meta.dirname;

export default defineConfig(() => ({
  root,
  cacheDir: '../../node_modules/.vite/packages/mcp',
  plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  test: {
    name: 'mcp',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    reporters: ['default'],
    testTimeout: 30_000,
    coverage: {
      reportsDirectory: '../../coverage/packages/mcp',
      provider: 'v8' as const,
    },
  },
}));
