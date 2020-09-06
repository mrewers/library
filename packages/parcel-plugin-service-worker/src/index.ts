import * as path from 'path';
import * as workBox from 'workbox-build';

import ParcelBundler from 'parcel-bundler';

import addScriptTag from './write-script-tag';

const errorHandler = (err) => {
  if (err) {
    console.error(`Error: ${err}`)
  }
}

module.exports = (bundler: ParcelBundler): void => {
  const outDir = bundler.options.outDir as string;

  bundler.on('bundled', () => {
    const index = path.resolve(outDir, 'index.html');

    workBox
      .generateSW({
        cleanupOutdatedCaches: true,
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,ico,jpg,jpeg,png,svg,webmanifest}'],
        swDest: 'dist/sw.js',
      })
      .catch(err => errorHandler(err) )
      .then(() => addScriptTag(index))
      .catch(err => errorHandler(err));
  });
};
