/**
 * Get the list of books read by the selected reader.
 *
 * @param {TypeBookList} list List of books.
 * @param {string} reader Name of the selected reader (or group of readers).
 * @param {number} readerCount Total number of readers (needed to calculate if all readers read an book).
 *
 */
const getRead = (list: TypeBookList, reader: string, readerCount: number): TypeBookList => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.read.length === readerCount);
    case 'any':
      return list.filter((item: IBook) => item.read.length > 0);
    default:
      return list.filter((item: IBook) => item.read.includes(reader));
  }
};

/**
 * Get the list of books not read by the selected reader.
 *
 * @param {TypeBookList} list List of books.
 * @param {string} reader Name of the selected reader (or group of readers).
 * @param {number} readerCount Total number of readers (needed to calculate if no readers read an book).
 */
const getUnread = (list: TypeBookList, reader: string, readerCount: number): TypeBookList => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.read.length === 0);
    case 'any':
      return list.filter((item: IBook) => item.read.length < readerCount);
    default:
      return list.filter((item: IBook) => !item.read.includes(reader));
  }
};

/**
 * Filters the provided list of books to match the book status and reader provided.
 *
 * @param {string} status The status of the book (read, unread, or either).
 * @param {string} reader Name of the selected reader (or group of readers).
 * @param {number} readerCount Total number of readers.
 * @param {TypeBookList} list List of books.
 */
export const filterList = (
  status: string,
  reader: string,
  readerCount: number,
  list: TypeBookList
): TypeBookList => {
  switch (status) {
    case 'read':
      return getRead(list, reader, readerCount);
    case 'unread':
      return getUnread(list, reader, readerCount);
    default:
      return list;
  }
};

/**
 * Retrieves the number of read, unread, and total books for a reader or group of readers.
 *
 * @param {TypeBookList} list List of books.
 * @param {string} reader Name of the selected reader (or group of readers).
 * @param {number} readerCount Total number of readers.
 * @returns {IStats} Totals for all, read, and unread books.
 */
export const getListStats = (list: TypeBookList, reader: string, readerCount: number): IStats => ({
  all: list.length || 0,
  read: getRead(list, reader, readerCount).length || 0,
  unread: getUnread(list, reader, readerCount).length || 0,
});
