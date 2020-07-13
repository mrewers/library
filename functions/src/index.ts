import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';

import { getCollection } from './utils/firestore-queries';

const serviceAccount = require('../serviceAccountKey.json');

// Initialize connection to firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://books-670e1.firebaseio.com',
});

const db = admin.firestore();

// Initialize the Express server
const app = express();

// Set middleware for Express server
app.use(cors({ origin: 'http://localhost:1234' }));

/* GET Routes - Used to retrieve data from the database */
app.get('/books', (req, res) => {
  const getData = async () => {
    try {
      const data = await db
        .collection('books')
        .get()
        .then(snapshot => getCollection(snapshot));

      return res.status(200).send({ books: data });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  };

  getData();
});

app.get('/readers', (req, res) => {
  const getData = async () => {
    try {
      const data = await db
        .collection('readers')
        .get()
        .then(snapshot => getCollection(snapshot));

      return res.status(200).send({ readers: data });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  };

  getData();
});

/* POST Routes - Used to add data to the database */
app.post('/books', (req, res) => {
  const writeData = async () => {
    try {
      const { book } = req.body;

      await db.collection('books').add({
        acquired: book.acquired,
        date: book.date,
        read: book.read,
        author: book.author,
        title: book.title,
      });

      const data = await db
        .collection('books')
        .get()
        .then(snapshot => getCollection(snapshot));

      return res.status(200).send({ books: data });
    } catch (err) {
      console.error(err);
      return res.status(500).send();
    }
  };

  writeData();
});

exports.app = functions.https.onRequest(app);
