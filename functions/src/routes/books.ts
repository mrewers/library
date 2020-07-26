import { Router } from 'express';

import { add, deleteOne, getAll, getOne, update } from '../utils/route-types';
import { authenticateJWT } from '../auth';
import { db } from '../db';

export const bookRoutes = () => {
  const router = Router();

  /* GET Routes - Used to retrieve data from the database */
  router.get('/', (req, res) => {
    try {
      return getAll('books', db, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  router.get('/:id', (req, res) => {
    try {
      return getOne('books', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  /* POST Routes - Used to add data to the database */
  router.post('/', authenticateJWT, (req, res) => {
    try {
      return add('books', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  /* PUT Routes - Used to add data to the database */
  router.put('/:id', authenticateJWT, (req, res) => {
    try {
      return update('books', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  /* DELETE Routes - Used to remove data from the database */
  router.delete('/:id', authenticateJWT, (req, res) => {
    try {
      return deleteOne('books', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  return router;
};
