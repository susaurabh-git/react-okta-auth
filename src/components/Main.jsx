import React from 'react';
import { withRouter } from 'react-router';
import { Route, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { authAction } from '../actions/authAction';
import Home from './view/Home';
import SignIn from './auth/SignIn';
import MultiFactorSelect from './auth/MultiFactorSelect';
import MultiFactorVerify from './auth/MultiFactorVerify';
import Welcome from './view/Welcome';
import oktaAuthClient from '../utils/oktaAuthClient'

const Main = (props) => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuthClient} onAuthRequired={onAuthRequired} restoreOriginalUri={restoreOriginalUri}>
      <Route exact path='/' component={Home} />
      <SecureRoute path='/protected' component={Welcome} />
      <Route path='/login' render={() => <SignIn actions={props.actions} />} />
      <Route path='/login/callback' component={LoginCallback} />
      <Route exact path='/select' component={MultiFactorSelect} />
      <Route exact path='/verify' component={MultiFactorVerify} />

    </Security>
  );
};

const mapStateToProps = (state, ownProps) => ({});
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authAction }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
