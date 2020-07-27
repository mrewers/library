import { Router } from 'express';

import { add, getAll, getOne } from '../utils/route-types';
import { authenticateJWT } from '../auth';

export const retiredRoutes = (db: FirebaseFirestore.Firestore): Router => {
  const router = Router();

  /* GET Routes - Used to retrieve data from the database */
  router.get('/', (req, res) => {
    try {
      return getAll('retired', db, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  router.get('/:id', (req, res) => {
    try {
      return getOne('retired', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  /* POST Routes - Used to add data to the database */
  router.post('/', authenticateJWT, (req, res) => {
    try {
      return add('retired', db, req, res);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  return router;
};
