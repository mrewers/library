const getRead = (list: TypeBookList): TypeBookList =>
  list.filter((item: IBook) => item.read.length > 0);

const getUnread = (list: TypeBookList): TypeBookList =>
  list.filter((item: IBook) => item.read.length === 0);

export const filterList = (filter: string, list: TypeBookList): TypeBookList => {
  switch (filter) {
    case 'read':
      return getRead(list);
    case 'unread':
      return getUnread(list);
    default:
      return list;
  }
};

export const getListStats = (list: TypeBookList): IStats => ({
  all: list.length || 0,
  read: getRead(list).length || 0,
  unread: getUnread(list).length || 0,
});
