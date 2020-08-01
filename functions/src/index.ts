import * as dotEnv from 'dotenv';

// Load environmental variables
dotEnv.config();

import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import 'firebase-functions';

import { decodeSA } from './utils/decode';
import { routes } from './routes';

const dbName: string | undefined = process.env.FIRESTORE_DB_NAME;
const encoded: string | undefined = process.env.FIRESTORE_SA;

// Check for required envvars
if (encoded === undefined) {
  throw new Error('Missing service account credentials.');
}

if (dbName === undefined) {
  throw new Error('Database name not specified.');
}

// Initialize app
admin.initializeApp({
  credential: admin.credential.cert(decodeSA(encoded)),
  databaseURL: `https://${dbName}.firebaseio.com`,
});

// Initialize the Firestore connection
const db = admin.firestore();

// Initialize the Express server
const app = express();

// Set middleware for Express server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.API_ALLOWED_ORIGIN }));

// Set API endpoints
const router = express.Router();

router.use('/books', routes.bookRoutes(db));
router.use('/readers', routes.readerRoutes(db));
router.use('/retired', routes.retiredRoutes(db));

app.use('/', router);

app.disable('x-powered-by');

exports.api = functions.https.onRequest(app);
