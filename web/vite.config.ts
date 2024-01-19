import { fileURLToPath, URL as NodeURL } from 'node:url';

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [

    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    devtools({
      autoname: true
    }),
    solidPlugin(),
  ],
  resolve: {
    alias: {
      'components': fileURLToPath(new NodeURL('./src/components', import.meta.url)),
      'context': fileURLToPath(new NodeURL('./src/context', import.meta.url)),
      'mocks': fileURLToPath(new NodeURL('./src/__mockData__', import.meta.url)),
      'style': fileURLToPath(new NodeURL('./src/style', import.meta.url)),
      'utils': fileURLToPath(new NodeURL('./src/utils', import.meta.url)),
    }
  },
  server: {
    port: 3000,
  },
});