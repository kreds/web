import { AuthenticationRequest } from '../types/models/AuthenticationRequest';
import { apiUrl } from '../config';

export async function authenticate(request: AuthenticationRequest) {
  const req = await fetch(apiUrl + 'v1/authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  return await req.json();
}
