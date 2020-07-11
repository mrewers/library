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

export const filterList = (
  type: string,
  reader: string,
  readerCount: number,
  list: TypeBookList
): TypeBookList => {
  switch (type) {
    case 'read':
      return getRead(list, reader, readerCount);
    case 'unread':
      return getUnread(list, reader, readerCount);
    default:
      return list;
  }
};

export const getListStats = (list: TypeBookList, reader: string, readerCount: number): IStats => ({
  all: list.length || 0,
  read: getRead(list, reader, readerCount).length || 0,
  unread: getUnread(list, reader, readerCount).length || 0,
});
