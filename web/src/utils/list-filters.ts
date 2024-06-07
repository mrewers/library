export const filterRetired = (list: IBook[]) => {
  const active = [] as IBook[];
  const retired = [] as IBook[];
  
  list.forEach( item => {
    if (item.retired === true) {
      retired.push( item );
    } else {
      active.push( item );
    }
  });

  return [active, retired];
}

/**
 * Get the list of books read by the selected reader.
 *
 * @param list List of books.
 * @param reader Id of the selected reader (or name of the group of readers).
 * @param readerCount Total number of readers (needed to calculate if all readers read an book).
 *
 */
export const getRead = (list: IBook[], reader: string, readerCount: number): IBook[] => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.readBy.length === readerCount);
    case 'any':
      return list.filter((item: IBook) => item.readBy.length > 0);
    default:
      return list.filter((item: IBook) => item.readBy.includes(reader));
  }
};

/**
 * Get the list of books not read by the selected reader.
 *
 * @param list List of books.
 * @param reader Name of the selected reader (or group of readers).
 * @param readerCount Total number of readers (needed to calculate if no readers read an book).
 */
export const getUnread = (list: IBook[], reader: string, readerCount: number): IBook[] => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.readBy.length === 0);
    case 'any':
      return list.filter((item: IBook) => item.readBy.length < readerCount);
    default:
      return list.filter((item: IBook) => !item.readBy.includes(reader));
  }
};

/**
 * Retrieves the number of read, unread, and total books for a reader or group of readers.
 *
 * @param list List of books.
 * @param reader Id of the selected reader (or name of the group of readers).
 * @param readerCount Total number of readers.
 * @returns Totals for all, read, and unread books.
 */
export const getListStats = (list: IBook[], reader: string, readerCount: number): IStats => ({
  all: list.length || 0,
  read: getRead(list, reader, readerCount).length || 0,
  unread: getUnread(list, reader, readerCount).length || 0,
});
