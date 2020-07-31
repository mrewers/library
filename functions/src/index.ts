import * as dotEnv from 'dotenv';

// Load environmental variables
dotEnv.config();

import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import 'firebase-functions';

import { routes } from './routes';

const encoded: string | undefined = process.env.FIRESTORE_SA;

if (encoded === undefined) {
  throw new Error('Missing service account credentials.');
}

const serviceAccount = JSON.parse(
  Buffer.from(encoded, 'base64').toString('ascii')
) as admin.ServiceAccount;

const databaseURL: string =
  typeof process.env.FIRESTORE_DB_NAME === 'string'
    ? `https://${process.env.FIRESTORE_DB_NAME}.firebaseio.com`
    : '';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});

const db = admin.firestore();

// Initialize the Express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set middleware for Express server
app.use(cors({ origin: process.env.API_ALLOWED_ORIGIN }));

// Set API endpoints
const router = express.Router();

router.use('/books', routes.bookRoutes(db));
router.use('/readers', routes.readerRoutes(db));
router.use('/retired', routes.retiredRoutes(db));

app.use('/', router);

app.disable('x-powered-by');

exports.api = functions.https.onRequest(app);
