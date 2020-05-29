import { AuthenticationRequest } from '../types/models/AuthenticationRequest';
import { TwoFactorRequest } from '../types/models/TwoFactorRequest';
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

export async function twoFactorVerify(
  request: TwoFactorRequest,
  token: string
) {
  const req = await fetch(apiUrl + 'v1/2fa/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(request),
  });

  return await req.json();
}
