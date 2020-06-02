import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router'

import App from './components/App';

import * as serviceWorker from './serviceWorker';
import {createBrowserHistory} from 'history'

import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
