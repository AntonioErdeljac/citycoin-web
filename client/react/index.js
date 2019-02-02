import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';

import '../scss/style.scss';

import { Authentication } from './components';
import { reducers, middleware } from './store';

import { setLocale } from '../../common/i18n';
import { paths } from '../../common/constants';

const store = createStore(reducers, applyMiddleware(thunk, middleware()));

setLocale('hr');

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Route
          render={() => (
            <Switch>
              <Route path={paths.client.LOGIN} component={Authentication.Login} />
            </Switch>
          )}
        />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};
