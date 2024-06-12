import type { IBookStoreState } from 'context/BookProvider';

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
 * Determine which subset of the the book list should be used based on the provided filters.
 * @param list The BookProvider store, which contains the various book list groupings.
 * @param status The read status to search on - either 'read', 'unread' or 'all'.
 * @param reader Which reader's list to use - either 'all', 'any', or the index of the reader from a list of readers.
 * @param retired Whether or not to limit the search to retired books - defaults to false.
 * @returns A list of books that match the provided criteria.
 */
export const pickBookSubList = (
  list: IBookStoreState,
  status: 'all' | 'read' | 'unread',
  reader: 'all' | 'any' | number,
  retired: boolean = false,
) => {
  // If all books is selected (regardless of the reader) return the full book list.
  if ( status === 'all' ) {
    return retired ? list.fullList.retired : list.fullList.active;
  }

  // If the value of readList is a number, it refers to the index of a filtered user-specific lists.
  if ( typeof reader === 'number' ) {
    return retired ? list.retired.filtered[reader][status] : list.filtered[reader][status];
  }

  return retired ? list.retired[reader][status] : list[reader][status];
}

/**
 * Narrow down a list of books to only include those whose title or author names match a provided search term.
 * @param term The search term to be used to narrow down the book list.
 * @param list The full list of books to be searched within.
 * @param authors An optional list of authors to for search - separate from book list since that only includes author ids.
 * @returns A subset of the provided list of books that includes the specified search term.
 */
export const filterSearched = (term: string, list: IBook[], authors?: IAuthor[]) => {
  // Bypass filtering if the search term is empty.
  if ( !term ) {
    return list;
  }

  // Casing doesn't matter so we do all comparisons in lowercase.
  const lower = term.toLowerCase();

  const filtered = list.filter( book => {
    const titleFound = book.title.toLocaleLowerCase().includes(lower);

    // If the title matches the search skip the unnecessary and more costly author search.
    if ( titleFound ) {
      return book;
    }

    // If no authors list provided or the author has no authors, also omit the author search.
    if ( !authors || !book.author || book.author.length === 0 ) {
      return;
    }

    // Get an array of author ids, for authors whose names match the search criteria.
    const filteredAuthors = authors.map( author => {
      if ( author.nameFull && author.nameFull.toLowerCase().includes( lower ) ) {
        return author.id;
      }
    } );

    let authorFound = false;

    // Check if the book's authors are listed in the list of matching author ids.
    book.author.forEach( author => {
      if ( filteredAuthors.includes( author) ) {
        authorFound = true;
      }
    });

    if ( authorFound ) {
      return book;
    }
  } );

  return filtered;
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
