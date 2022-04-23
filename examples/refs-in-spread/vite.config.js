import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import * as pf from 'path';

export default defineConfig(({mode}) => ({
  plugins: [solidPlugin()],
  resolve: mode === 'production' ? {} : {
    conditions: ['solid-sources'],
    alias: {
      'rxcore': pf.resolve(__dirname, '../../submodules/solid/packages/solid/web/src/core.ts')
    }
  },
  optimizeDeps: {
    exclude: mode === 'production' ? [] : [
      'solid-js',
      'solid-app-router',
    ]
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
}));
