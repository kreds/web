import { AuthenticationRequest } from '../types/models/AuthenticationRequest';
import { AuthenticationResponse } from '../types/models/AuthenticationResponse';
import { TwoFactorRequest } from '../types/models/TwoFactorRequest';
import { TwoFactorResponse } from '../types/models/TwoFactorResponse';
import { User } from '../types/models/User';
import { apiUrl } from '../config';
import { fetchGet, fetchPost } from '../helpers/requests';

export async function currentUser() {
  return await fetchGet<{
    isAuthenticated: boolean;
    user?: User;
  }>('v1/authentication');
}

export async function authenticate(request: AuthenticationRequest) {
  return await fetchPost<AuthenticationResponse>('v1/authentication', request);
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

export async function twoFactorEnable() {
  return await fetchPost<any>('v1/authentication/2fa/enable');
}
