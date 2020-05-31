import React, { useCallback, useState } from 'react';
import QRCode from 'qrcode.react';

import { twoFactorEnable } from '../services/Authentication';

export const Dashboard: React.FC = () => {
  const [response, setResponse] = useState('');
  const [twoFaUri, setTwoFaUri] = useState<string>();
  const token = '';

  const click2FAEnable = useCallback(async () => {
    if (!token) return;
    const res = await twoFactorEnable(token);

    setResponse(JSON.stringify(res));
    if (res.uri) {
      setTwoFaUri(res.uri);
    }
  }, [setResponse, token, setTwoFaUri]);

  return (
    <div>
      <button onClick={click2FAEnable}>Enable 2FA</button>
      {twoFaUri ? <QRCode value={twoFaUri} /> : null}
      <pre>{response}</pre>
    </div>
  );
};

export default Dashboard;
