import React, { useCallback, useState } from 'react';
import './App.scss';
import { authenticate, twoFactorVerify } from './services/Authentication';
import { AuthenticationRequestType } from './types/models/AuthenticationRequest';

function App() {
  const [token, setToken] = useState<string>();
  const [response, setResponse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFaRequired, setTwoFaRequired] = useState(false);

  const click = useCallback(async () => {
    const res = await authenticate({
      type: AuthenticationRequestType.PASSWORD,
      username: username,
      subtype: 'bcrypt',
      data: password,
    });

    setResponse(JSON.stringify(res));
    if (res.token) {
      setToken(res.token);
    }

    if (res.result === 'require_2fa') {
      setTwoFaRequired(true);
    }
  }, [username, password, setResponse, setToken, setTwoFaRequired]);

  const click2FA = useCallback(async () => {
    if (!token) return;
    const res = await twoFactorVerify(
      {
        token: password,
      },
      token
    );

    setResponse(JSON.stringify(res));
    if (res.token) {
      setToken(res.token);
    }
  }, [password, setResponse, setToken, token]);

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="App">
      {!token ? (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={updateUsername}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button onClick={click}>Authenticate</button>
        </>
      ) : null}
      {twoFaRequired ? (
        <>
          <input
            type="password"
            placeholder="2FA code"
            value={password}
            onChange={updatePassword}
          />
          <button onClick={click2FA}>2FA verify</button>
        </>
      ) : null}
      <strong>{token}</strong>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
