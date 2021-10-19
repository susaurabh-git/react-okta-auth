import React from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { useOktaAuth } from '@okta/okta-react';

const SignIn = (props) => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated === true ?
    <Redirect to={{ pathname: '/' }} /> :
    <SignInForm actions={props.actions} />;
};

export default SignIn;