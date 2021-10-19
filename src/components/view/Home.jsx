import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  if (!authState) {
    return <div>Loading...</div>;
  }

  const notLoggedInMessage = !authState.isAuthenticated ?
    <div class="alert alert-primary" role="alert">
      This is a public page, please login to go to <Link to="/protected">Secure</Link> page.
    </div> :
    <div class="alert alert-primary" role="alert">
      You are logged in.
    </div>
    ;

  return (
    <>
      <div class="alert alert-primary" role="alert">
        Welcome to Okta Auth Integration App using ReactJS.
      </div>
      {notLoggedInMessage}

    </>
  );
};
export default Home;