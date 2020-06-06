import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Card, StyledBody, StyledAction } from 'baseui/card';

import { authenticate, twoFactorVerify } from '../services/Authentication';
import { AuthenticationRequestType } from '../types/models/AuthenticationRequest';
import { setAuthenticatedAction } from '../actions/state';

import { Centered } from '../styles';

const Authentication: React.FC = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFaRequired, setTwoFaRequired] = useState(false);

  const authenticated = useCallback(
    async (token: string) => {
      localStorage.setItem('kreds_token', token);
      dispatch(setAuthenticatedAction(true));
    },
    [dispatch]
  );

  const click = useCallback(async () => {
    setLoading(true);

    const res = await authenticate({
      type: AuthenticationRequestType.PASSWORD,
      username: username,
      subtype: 'bcrypt',
      data: password,
    });

    setLoading(false);

    if (res.token) {
      setToken(res.token);
    }

    if (res.result === 'require_2fa') {
      setPassword('');
      setTwoFaRequired(true);
    } else if (res.result === 'success' && res.token) {
      authenticated(res.token);
    }
  }, [username, password, setToken, setTwoFaRequired, authenticated]);

  const click2FA = useCallback(async () => {
    if (!token) return;

    setLoading(true);

    const res = await twoFactorVerify(
      {
        token: password,
      },
      token
    );

    setLoading(false);

    if (res.token) {
      authenticated(res.token);
    }
  }, [password, token, authenticated]);

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Centered>
      <Card title="Authenticate">
        {!token ? (
          <>
            <StyledBody>
              <FormControl label="Username">
                <Input type="text" value={username} onChange={updateUsername} />
              </FormControl>
              <FormControl label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
              </FormControl>
            </StyledBody>
            <StyledAction>
              <Button
                overrides={{
                  BaseButton: { style: { width: '100%' } },
                }}
                isLoading={loading}
                onClick={click}
              >
                Authenticate
              </Button>
            </StyledAction>
          </>
        ) : null}
        {twoFaRequired ? (
          <>
            <StyledBody>
              <FormControl label="2FA Code">
                <Input
                  type="password"
                  placeholder="2FA code"
                  value={password}
                  onChange={updatePassword}
                />
              </FormControl>
            </StyledBody>
            <StyledAction>
              <Button
                overrides={{
                  BaseButton: { style: { width: '100%' } },
                }}
                isLoading={loading}
                onClick={click2FA}
              >
                Verify
              </Button>
            </StyledAction>
          </>
        ) : null}
      </Card>
    </Centered>
  );
};

export default Authentication;
