const getRead = (list: TypeBookList, reader: string): TypeBookList => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.read.length > 0);
    default:
      return list.filter((item: IBook) => item.read.includes(reader));
  }
};

const getUnread = (list: TypeBookList, reader: string): TypeBookList => {
  switch (reader) {
    case 'all':
      return list.filter((item: IBook) => item.read.length === 0);
    default:
      return list.filter((item: IBook) => !item.read.includes(reader));
  }
};

export const filterList = (type: string, reader: string, list: TypeBookList): TypeBookList => {
  switch (type) {
    case 'read':
      return getRead(list, reader);
    case 'unread':
      return getUnread(list, reader);
    default:
      return list;
  }
};

export const getListStats = (list: TypeBookList, reader: string): IStats => ({
  all: list.length || 0,
  read: getRead(list, reader).length || 0,
  unread: getUnread(list, reader).length || 0,
});
