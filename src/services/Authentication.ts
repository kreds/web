import { AuthenticationRequest } from '../types/models/AuthenticationRequest';
import { AuthenticationResponse } from '../types/models/AuthenticationResponse';
import { TwoFactorRequest } from '../types/models/TwoFactorRequest';
import { TwoFactorResponse } from '../types/models/TwoFactorResponse';
import { apiUrl } from '../config';

export async function authenticate(request: AuthenticationRequest) {
  const req = await fetch(apiUrl + 'v1/authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  return (await req.json()) as AuthenticationResponse;
}

export async function twoFactorVerify(
  request: TwoFactorRequest,
  token: string
) {
  const req = await fetch(apiUrl + 'v1/authentication/2fa/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(request),
  });

  return (await req.json()) as TwoFactorResponse;
}

export async function twoFactorEnable(token: string) {
  const req = await fetch(apiUrl + 'v1/authentication/2fa/enable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({}),
  });

  return await req.json();
}
