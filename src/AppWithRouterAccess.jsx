import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './components/view/Home';
import SignIn from './components/auth/SignIn';
import Welcome from './components/view/Welcome';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: "https://dev-27949756.okta.com/oauth2/default",
    clientId: "0oa27jq1l01BjKokn5d7",
    redirectUri: window.location.origin + "/login/callback",
    onAuthRequired: onAuthRequired,
    pkce: true,
    });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={onAuthRequired} restoreOriginalUri={restoreOriginalUri}>
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/protected' component={Welcome} />
      <Route path='/login' render={() => <SignIn />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;