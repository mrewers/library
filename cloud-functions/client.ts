import * as dotEnv from 'dotenv';
import { Client as FDBClient } from 'faunadb';

// Load environmental variables
dotEnv.config();

const client = new FDBClient({
  domain: process.env.FAUNADB_DOMAIN,
  secret: process.env.FAUNADB_SECRET ?? '',
});

export default client;
