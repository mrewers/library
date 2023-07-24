/**
 * Get the list of books read by the selected reader.
 *
 * @param list List of books.
 * @param reader Name of the selected reader (or group of readers).
 * @param readerCount Total number of readers (needed to calculate if all readers read an book).
 *
 */
export const getRead = (list: IBook[], reader: string, readerCount: number): IBook[] => {
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
 * @param list List of books.
 * @param reader Name of the selected reader (or group of readers).
 * @param readerCount Total number of readers (needed to calculate if no readers read an book).
 */
const getUnread = (list: IBook[], reader: string, readerCount: number): IBook[] => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.read.length === 0);
    case 'any':
      return list.filter((item: IBook) => item.read.length < readerCount);
    default:
      console.log(reader)
      return list.filter((item: IBook) => !item.read.includes(reader));
  }
};

/**
 * Filters the provided list of books to match the book status and reader provided.
 *
 * @param status The status of the book (read, unread, or either).
 * @param reader Name of the selected reader (or group of readers).
 * @param readerCount Total number of readers.
 * @param list List of books.
 */
export const filterList = (
  status: string,
  reader: string,
  readerCount: number,
  list: IBook[]
): IBook[] => {
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
 * @param list List of books.
 * @param reader Name of the selected reader (or group of readers).
 * @param readerCount Total number of readers.
 * @returns Totals for all, read, and unread books.
 */
export const getListStats = (list: IBook[], reader: string, readerCount: number): IStats => ({
  all: list.length || 0,
  read: getRead(list, reader, readerCount).length || 0,
  unread: getUnread(list, reader, readerCount).length || 0,
});
