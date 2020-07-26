import * as admin from 'firebase-admin';

const atob = require('atob');

const serviceAccount: string =
  typeof process.env.FIRESTORE_SA === 'string' ? process.env.FIRESTORE_SA : '';

const databaseURL: string =
  typeof process.env.FIRESTORE_DB_NAME === 'string'
    ? `https://${process.env.FIRESTORE_DB_NAME}.firebaseio.com`
    : '';

// Initialize connection to firebase
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(atob(serviceAccount))),
  databaseURL,
});

export const db = admin.firestore();
