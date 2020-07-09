const getRead = (list) => list.filter((item) => item.read === true);
const getUnread = (list) => list.filter((item) => item.read === false);

export const filterList = (filter: string, list) => {
  switch (filter) {
    case 'read':
      return getRead(list);
    case 'unread':
      return getUnread(list);
    default:
      return list;
  }
};

export const getListStats = (list) => ({
  all: list.length || 0,
  read: getRead(list).length || 0,
  unread: getUnread(list).length || 0,
});
