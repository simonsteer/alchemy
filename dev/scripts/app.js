import React from 'react';
import ReactDOM from 'react-dom';

import store from './store'
import { Provider } from 'react-redux';

import Main from './containers/Main'

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, document.querySelector('#root'));