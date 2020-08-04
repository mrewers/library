export const containsReader = (readers: readonly string[], name: string): boolean =>
  readers.includes(name);

export const getSelectedReaderData = (readers: readonly IReader[], name: string): IReader => {
  const reader = readers.filter(reader => reader.name === name);

  return reader[0];
};
