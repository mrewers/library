import * as admin from 'firebase-admin';

const encoded = process.env.FIRESTORE_SA;

let serviceAccount = null;

if (encoded) {
  serviceAccount = JSON.parse(Buffer.from(encoded, 'base64').toString('ascii'));
}

const databaseURL: string =
  typeof process.env.FIRESTORE_DB_NAME === 'string'
    ? `https://${process.env.FIRESTORE_DB_NAME}.firebaseio.com`
    : '';

// Initialize connection to firebase
if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL,
  });
}

export const db = admin.firestore();
