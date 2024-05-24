export const containsReader = (readers: readonly string[], name: string): boolean => readers.includes(name);

export const getSelectedReaderData = (readers: readonly IReader[], id: string): IReader => {
  const reader = readers.filter(reader => reader.id === id);

  return reader[0];
};

export const getReaderName = (id: string, list: IReader[]): string => {
  const reader = list.find( r => r.id === id );

  if (reader?.name) {
    return reader.name;
  }

  return id;
}