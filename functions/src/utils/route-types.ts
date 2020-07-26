import { Request, Response } from 'express';

import { hasScope } from '../auth';
import { getCollection, structureBook } from './firestore-queries';

export const add = async (
  collection: string,
  db: FirebaseFirestore.Firestore,
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!hasScope(res)) {
      return res.sendStatus(403);
    }

    const { book } = req.body;

    const docRef = await db.collection(collection).add(structureBook(book));

    const data = await docRef.get().then(snapshot => snapshot.data());

    return res.status(200).send({ book: data, id: docRef.id });
  } catch (err) {
    return res.status(500).send(err);
  }
};

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
      .then(result => result.data());

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

    return res.status(200).send({ id, message: `Successfully delete document with id: ${id}` });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const update = async (
  collection: string,
  db: FirebaseFirestore.Firestore,
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!hasScope(res)) {
      return res.sendStatus(403);
    }

    const { id } = req.params;
    const { book } = req.body;

    await db.collection(collection).doc(id).update(structureBook(book));

    const data = await db
      .collection(collection)
      .doc(id)
      .get()
      .then(snapshot => snapshot.data());

    return res.status(200).send({ book: data });
  } catch (err) {
    return res.status(500).send(err);
  }
};
