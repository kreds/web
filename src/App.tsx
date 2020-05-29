import React, { useCallback, useState } from 'react';
import './App.scss';
import { authenticate } from './services/Authentication';
import { AuthenticationRequestType } from './types/models/AuthenticationRequest';

function App() {
  const [token, setToken] = useState<string>();
  const [response, setResponse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
  }, [username, password, setResponse]);

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="App">
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
      <strong>{token}</strong>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
