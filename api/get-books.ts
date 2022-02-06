import { query as q, Client as FDBClient } from 'faunadb';

const client = new FDBClient({
  domain: process.env.FAUNADB_DOMAIN,
  secret: process.env.FAUNADB_SECRET ?? '',
});

const getBooks = async (req, res) => {
  try {
    const dbs = await client.query(q.Map(q.Paginate(), ref => q.Get(ref)));

    res.status(200).json({ books: dbs.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getBooks;
