import { getFromStorage } from './auth';

const headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${getFromStorage('access_token')}`,
  'Content-Type': 'application/json',
};

export const fetchData = async (endpoint: string): Promise<TypeAllowedResponses> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/${endpoint}`);

    const data = (await response.json()) as TypeAllowedResponses;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const addItem = async (
  body: IRequestBody,
  endpoint: string
): Promise<TypeAllowedResponses> => {
  try {
    const response: Response = await fetch(`${process.env.API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as TypeAllowedResponses;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateItem = async (
  body: IRequestBody,
  endpoint: string,
  id: string
): Promise<TypeAllowedResponses> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as TypeAllowedResponses;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteItem = async (endpoint: string, id: string): Promise<TypeAllowedResponses> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
      headers,
    });

    const data = (await response.json()) as TypeAllowedResponses;

    return data;
  } catch (err) {
    console.error(err);
  }
};

declare global {
  interface IBookResponse {
    readonly book: IBook;
    readonly id?: string;
  }

  interface IBooksResponse {
    readonly books: TypeBookList;
  }

  interface IReadersResponse {
    readonly readers: readonly IReader[];
  }

  interface IRetiredResponse {
    readonly retired: readonly IBook[];
  }

  interface IRequestBody {
    readonly book: IBook | IRetired;
  }

  type TypeAllowedResponses =
    | void
    | IReadersResponse
    | IBookResponse
    | IBooksResponse
    | IRetiredResponse;
}
