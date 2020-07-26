import { Router } from 'express';

import { db } from '../db';
import { getAll, getOne } from '../utils/route-types';

export const readerRoutes = () => {
  const router = Router();

  /* GET Routes - Used to retrieve data from the database */
  router.get('/', (req, res) => {
    try {
      return getAll('readers', db, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  router.get('/:id', (req, res) => {
    try {
      return getOne('readers', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  return router;
};
