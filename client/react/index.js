import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';

import '../scss/style.scss';

import { Authentication, Navbar, Cities, Services, Subscriptions, Supervisors } from './components';
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
            <React.Fragment>
              <Switch>
                <Route path={paths.client.LOGIN} component={Authentication.Login} />
                <Route path={paths.client.REGISTER} component={Authentication.Register} />
                <Navbar>
                  <Switch>
                    <Route path={paths.client.SUPERVISORS_NEW} component={Supervisors.Form} />
                    <Route path={paths.client.SUPERVISORS_ID} component={Supervisors.Form} />
                    <Route path={paths.client.SUPERVISORS} component={Supervisors.List} />

                    <Route path={paths.client.SUBSCRIPTIONS_NEW} component={Subscriptions.Form} />
                    <Route path={paths.client.SUBSCRIPTIONS_ID} component={Subscriptions.Form} />
                    <Route path={paths.client.SUBSCRIPTIONS} component={Subscriptions.List} />

                    <Route path={paths.client.SERVICES_NEW} component={Services.Form} />
                    <Route path={paths.client.SERVICES_ID} component={Services.Form} />
                    <Route path={paths.client.SERVICES} component={Services.List} />

                    <Route path={paths.client.CITIES_NEW} component={Cities.Form} />
                    <Route path={paths.client.CITIES_ID} component={Cities.Form} />
                    <Route path={paths.client.CITIES} component={Cities.List} />

                    <Route path={paths.client.BASE} component={Cities.List} />
                  </Switch>
                </Navbar>
              </Switch>
            </React.Fragment>
          )}
        />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};
