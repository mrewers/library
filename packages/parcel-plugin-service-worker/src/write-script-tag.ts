import * as fs from 'fs';

const addScriptTag = (index: string): void => {
  fs.readFile(index, 'utf-8', (err: Error, data: string) => {
    if (err !== undefined) console.error(err);

    if (!data.includes('serviceWorker.register')) {
      const swTag = `
        <script>
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        </script>
      </body>
      `;

      data = data.replace('</body>', swTag);
      fs.writeFileSync(index, data);
    }
  });
};

export default addScriptTag;
