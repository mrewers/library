export const getCollection = (snapshot: FirebaseFirestore.QuerySnapshot) => {
  const col = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });

  return col;
};

export const structureBook = (book: IBook): IBook => ({
  acquired: book.acquired,
  author: book.author,
  date: book.date,
  read: book.read,
  title: book.title,
});

export const structureRetired = (book: IRetired): IRetired => ({
  acquired: book.acquired,
  author: book.author,
  date: book.date,
  dateRetired: book.dateRetired,
  read: book.read,
  title: book.title,
});

export const structureData = (
  data: IBook | IRetired,
  type: 'books' | 'retired'
): IBook | IRetired => {
  switch (type) {
    case 'books':
      return structureBook(data);
    case 'retired':
      return structureRetired(data);
  }
};

declare global {
  interface IBook {
    readonly acquired?: boolean;
    readonly date?: string;
    readonly read?: readonly string[];
    readonly author?: string;
    readonly title?: string;
  }

  interface IRetired extends IBook {
    readonly dateRetired?: string;
  }
}
