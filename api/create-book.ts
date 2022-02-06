import { query as q, Client as FDBClient } from 'faunadb';

const client = new FDBClient({
  domain: process.env.FAUNADB_DOMAIN,
  secret: process.env.FAUNADB_SECRET ?? '',
});

const createBook = async (req, res) => {
  const { author, id, title } = req.body.data;

  try {
    const dbs = await client.query(
      q.Create(q.Collection('books'), {
        data: {
          author,
          created: Date.now(),
          modified: Date.now(),
          title,
        },
      })
    );

    res.status(200).json(dbs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = createBook;
