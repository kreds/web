import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';

import App from './App';
import createStore from './store';

const store = createStore();
const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <App />
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
