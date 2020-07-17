const fs = require('fs');

const serviceAccount = require('../serviceAccountKey.json');

if (serviceAccount !== undefined) {
  const stringified = JSON.stringify(serviceAccount);

  fs.writeFile('serviceAccountKey.txt', stringified, err => {
    if (err) return console.log(err);
    console.log('Service account key saved as string in /functions/serviceAccountKey.txt');
  });
}
