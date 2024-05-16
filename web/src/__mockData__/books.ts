export const bookOne: IBook = {
  id: 'abcd',
  author: 'Mr. Princeton',
  date: '2020-08-05',
  read: ['Alice'],
  retired: false,
  title: 'Coding for Dummies',
};

export const bookTwo: IBook = {
  id: 'efgh',
  author: 'Ms. Harvard',
  date: '2020-07-06',
  read: ['Alice', 'Bob'],
  retired: false,
  title: 'JavaScript for Dummies',
};

export const bookThree: IBook = {
  id: 'ijkl',
  author: 'Mrs. Yale',
  date: '2020-07-06',
  read: [],
  retired: true,
  title: 'TypeScript for Dummies',
};

export const books: TypeBookList = [bookOne, bookTwo, bookThree];
