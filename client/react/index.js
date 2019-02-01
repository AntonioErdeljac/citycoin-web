import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, createStore, applyMiddleware } from 'react-redux';

import { reducers, middleware } from './store';

const store = createStore(reducers, applyMiddleware(thunk, middleware()));

window.onload = () => {
  ReactDOM.render(
    <Provider>
      <p>Hello world</p>
    </Provider>,
    document.getElementById('root'),
  );
};
