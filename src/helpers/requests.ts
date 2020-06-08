import { apiUrl } from '../config';
import { requestHeaders } from './token';

export async function fetchGet<T>(path: string): Promise<T> {
  const req = await fetch(apiUrl + path, {
    method: 'GET',
    headers: requestHeaders(),
  });

  return await req.json();
}

export async function fetchPost<T>(path: string, data?: any): Promise<T> {
  const req = await fetch(apiUrl + path, {
    method: 'POST',
    headers: requestHeaders({
      'Content-Type': 'application/json',
    }),
    body: data ? JSON.stringify(data) : undefined,
  });

  return await req.json();
}
