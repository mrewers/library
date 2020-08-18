export const bookOne: IBook = {
  id: 'abcd',
  acquired: 'yes',
  author: 'Mr. Princeton',
  date: '2020-08-05',
  read: ['Alice'],
  title: 'Coding for Dummies',
};

export const bookTwo: IBook = {
  id: 'efgh',
  acquired: 'no',
  author: 'Ms. Harvard',
  date: '2020-07-06',
  read: ['Alice', 'Bob'],
  title: 'JavaScript for Dummies',
};

export const bookThree: IBook = {
  id: 'ijkl',
  acquired: 'no',
  author: 'Mrs. Yale',
  date: '2020-07-06',
  read: [],
  title: 'TypeScript for Dummies',
};

export const books: TypeBookList = [bookOne, bookTwo, bookThree];
