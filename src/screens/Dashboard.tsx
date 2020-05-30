import React, { useCallback, useState } from 'react';
import QRCode from 'qrcode.react';

import { twoFactorEnable } from '../services/Authentication';

function Dashboard() {
  const [token, setToken] = useState<string>();
  const [response, setResponse] = useState('');
  const [twoFaUri, setTwoFaUri] = useState<string>();

  const click2FAEnable = useCallback(async () => {
    if (!token) return;
    const res = await twoFactorEnable(token);

    setResponse(JSON.stringify(res));
    if (res.uri) {
      setTwoFaUri(res.uri);
    }
  }, [setResponse, setToken, token, setTwoFaUri]);

  return (
    <div>
      <strong>{token}</strong>
      <button onClick={click2FAEnable} disabled={!token}>
        Enable 2FA
      </button>
      {twoFaUri ? <QRCode value={twoFaUri} /> : null}
      <pre>{response}</pre>
    </div>
  );
}

export default Dashboard;
