export const fetchData = async (endpoint: string): Promise<TypeAllowedResponses> => {
  try {
    const data = await fetch(`/api/${endpoint}`)
      .then((res: Response) => res.json())
      .then((d: TypeAllowedResponses) => d);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const submitData = async (body, endpoint: string) => {
  // console.log(body);
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

declare global {
  interface IBooksResponse {
    readonly books: TypeBookList;
  }

  type TypeAllowedResponses = void | readonly IReader[] | IBooksResponse;
}
