import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';

import App from './pages/App';
import {
  LoginPage,
  LogoutPage,
  SignUpPage,
  RecoveryPage,
  ResetPasswordPage,
  ValidateAccountPage,
} from './pages/UserAccess';

const routes = params => (
  <ConnectedRouter history={params.history}>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/logout" component={LogoutPage} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Route exact path="/recover-password" component={RecoveryPage} />
      <Route exact path="/reset-password/:token?" component={ResetPasswordPage} />
      <Route exact path="/validate-account/:token?" component={ValidateAccountPage} />
      <Route path="/:section?/:id?" component={App} />
    </Switch>
  </ConnectedRouter>
);

export default hot(module)(routes);
