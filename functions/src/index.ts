const dotEnv = require('dotenv');

import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { getCollection } from './utils/firestore-queries';
import { authenticateJWT } from './auth';

const serviceAccount = require('../serviceAccountKey.json');

dotEnv.config();

// Initialize connection to firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_URL,
});

const db = admin.firestore();

// Initialize the Express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set middleware for Express server
app.use(cors({ origin: process.env.API_ALLOWED_ORIGIN }));

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
app.post('/books', authenticateJWT, (req, res) => {
  const writeData = async () => {
    try {
      if (!res.locals.user || res.locals.user.scope !== 'add:books') {
        return res.sendStatus(401);
      }

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
      return res.status(500).send(err);
    }
  };

  writeData();
});

app.disable('x-powered-by');

exports.app = functions.https.onRequest(app);
