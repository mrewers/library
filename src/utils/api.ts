type TypeAllowedResponses = void | readonly IReader[] | TypeBookList;

export const fetchData = async (endpoint: string): Promise<TypeAllowedResponses> => {
  const data = await fetch(`/api/${endpoint}`)
    .then((res: Response) => res.json())
    .then((d: TypeAllowedResponses) => d)
    .catch(err => console.error(err));

  return data;
};
