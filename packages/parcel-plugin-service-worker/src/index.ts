import * as path from 'path';
import * as workBox from 'workbox-build';

import ParcelBundler from 'parcel-bundler';

import addScriptTag from './write-script-tag';

module.exports = (bundler: ParcelBundler): void => {
  const outDir = bundler.options.outDir as string;

  bundler.on('buildEnd', () => {
    const index = path.resolve(outDir, 'index.html');

    workBox
      .generateSW({
        globDirectory: 'dist',
        globPatterns: ['**/*.{css,js,html,ico,jpg,jpeg,png,svg,webmanifest}'],
        swDest: 'dist/sw.js',
      })
      .catch(err => console.error(`Error: ${err}`))
      .then(() => addScriptTag(index));
  });
};
