import * as dotEnv from 'dotenv';

// Load environmental variables
dotEnv.config();

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { bookRoutes } from './routes/books';
import { readerRoutes } from './routes/readers';

// Initialize the Express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set middleware for Express server
app.use(cors({ origin: process.env.API_ALLOWED_ORIGIN }));

// Set API endpoints
const router = express.Router();

router.use('/books', bookRoutes());
router.use('/readers', readerRoutes());

app.use('/', router);

app.disable('x-powered-by');

exports.api = functions.https.onRequest(app);
