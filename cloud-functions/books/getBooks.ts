import { query as q } from 'faunadb';

import client from '../client';

// Const getBooks = async (req, res) => {
//   try {
//     const dbs = await client.query(
//       q.Map(
//         q.Paginate(
//           q.Match(
//             q.Index('books')
//           )
//         ), ref => q.Get(ref)
//       )
//     );

  
//     res.status(200).json({ books: dbs.data });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

const getBooks = async (req, res) => {}

export default getBooks;
