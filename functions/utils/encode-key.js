const fs = require('fs');

const serviceAccount = require('../serviceAccountKey.json');

if (serviceAccount !== undefined) {
  const stringified = JSON.stringify(serviceAccount);
  const encoded = Buffer.from(stringified).toString('base64');

  fs.writeFile('serviceAccountKey.txt', encoded, err => {
    if (err) return console.log(err);
    console.log(
      'The encoded service account key has been saved to /functions/serviceAccountKey.txt'
    );
  });
}
