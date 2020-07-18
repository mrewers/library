export const getCollection = (snapshot: FirebaseFirestore.QuerySnapshot) => {
  const col = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });

  return col;
};

export const structureBook = (book: IBook): IBook => ({
  acquired: book.acquired,
  date: book.date,
  read: book.read,
  author: book.author,
  title: book.title,
});

interface IBook {
  readonly acquired?: boolean;
  readonly date?: string;
  readonly read?: readonly string[];
  readonly author?: string;
  readonly title?: string;
}
