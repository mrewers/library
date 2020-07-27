import * as admin from 'firebase-admin';

export const initAdmin = () => {
  const encoded = process.env.FIRESTORE_SA;

  let serviceAccount: null | admin.ServiceAccount = null;

  if (encoded !== undefined) {
    serviceAccount = JSON.parse(Buffer.from(encoded, 'base64').toString('ascii'));
  }

  const databaseURL: string =
    typeof process.env.FIRESTORE_DB_NAME === 'string'
      ? `https://${process.env.FIRESTORE_DB_NAME}.firebaseio.com`
      : '';

  // Initialize connection to firebase
  if (serviceAccount !== null) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL,
    });
  }

  return admin;
};
