import { getFromStorage } from './auth';

export const fetchData = async (
  endpoint: TypeAvailableEndpoints
): Promise<TypeAllowedResponses> => {
  try {
    const data = await fetch(`${process.env.API_BASE_URL}/${endpoint}`)
      .then((res: Response) => res.json())
      .then((d: TypeAllowedResponses) => d);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const submitData = async (
  body: IRequestBody,
  endpoint: TypeAvailableEndpoints
): Promise<TypeAllowedResponses> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getFromStorage('access_token')}`,
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

  interface IReadersResponse {
    readonly readers: readonly IReader[];
  }

  interface IRequestBody {
    readonly book: IBook;
  }

  type TypeAllowedResponses = void | IReadersResponse | IBooksResponse;
  type TypeAvailableEndpoints = 'books' | 'readers';
}
