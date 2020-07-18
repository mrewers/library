import { Request, Response } from 'express';

import { getCollection } from './firestore-queries';

export const getAll = async (
  collection: string,
  db: FirebaseFirestore.Firestore,
  res: Response
): Promise<Response> => {
  try {
    const data = await db
      .collection(collection)
      .get()
      .then(snapshot => getCollection(snapshot));

    return res.status(200).send({ [collection]: data });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getOne = async (
  collection: string,
  db: FirebaseFirestore.Firestore,
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await db
      .collection(collection)
      .doc(req.params.id)
      .get()
      .then(result => result);

    const singular = collection.slice(0, -1);

    return res.status(200).send({ [singular]: data });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const deleteOne = async (
  collection: string,
  db: FirebaseFirestore.Firestore,
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    await db.collection(collection).doc(id).delete();

    return res.status(200).send({ id, message: 'Successfully delete document' });
  } catch (err) {
    return res.status(500).send(err);
  }
};
