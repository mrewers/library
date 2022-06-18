import { query as q } from 'faunadb';

import client from '../client';

const createBook = async (req, res) => {
  const data = req?.body?.data || {};

  const {
    acquired,
    author,
    date,
    dateRetired,
    read,
    title
  } = data;

  try{
    const dbs = await client.query(
      q.Create(
        q.Collection('books'),
        {
          data: {
            acquired,
            author,
            date,
            dateRetired,
            read,
            title,
            created_at: Date.now(),
            updated_at: Date.now(),
          }
        }
      )
    )

    res.status(200).json(dbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default createBook;
