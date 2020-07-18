import * as dotEnv from 'dotenv';

// Load environmental variables
dotEnv.config();

import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { deleteOne, getAll, getOne } from './utils/route-types';
import { getCollection } from './utils/firestore-queries';
import { authenticateJWT } from './auth';

const serviceAccount: string =
  typeof process.env.FIRESTORE_SA === 'string' ? process.env.FIRESTORE_SA : '';

const databaseURL: string =
  typeof process.env.FIRESTORE_DB_NAME === 'string'
    ? `https://${process.env.FIRESTORE_DB_NAME}.firebaseio.com`
    : '';

// Initialize connection to firebase
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL,
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
  try {
    return getAll('books', db, res);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/books/:id', (req, res) => {
  try {
    return getOne('books', db, req, res);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/readers', (req, res) => {
  try {
    return getAll('readers', db, res);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/readers/:id', (req, res) => {
  try {
    return getOne('readers', db, req, res);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* POST Routes - Used to add data to the database */
app.post('/books', authenticateJWT, (req, res) => {
  const writeData = async (): Promise<express.Response> => {
    const scope =
      typeof process.env.AUTH0_SCOPE === 'string' ? process.env.AUTH0_SCOPE : 'add:books';

    try {
      if (!res.locals?.user?.scope || res.locals.user.scope !== scope) {
        return res.sendStatus(403);
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

  try {
    return writeData();
  } catch (err) {
    return res.status(500).send(err);
  }
});

/* DELETE Routes - Used to remove data from the database */
app.delete('/books/:id', authenticateJWT, (req, res) => {
  try {
    return deleteOne('books', db, req, res);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.disable('x-powered-by');

exports.app = functions.https.onRequest(app);
