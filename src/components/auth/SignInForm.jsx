import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authAction } from '../../actions/authAction'
import oktaAuthClient from "../../utils/oktaAuthClient";

const SignInForm = (props) => {
  // const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    oktaAuthClient
      .signInWithCredentials({ username, password })
      .then((transaction) => {
        if (transaction.status === "MFA_REQUIRED") {
          dispatch(authAction.update(transaction))
          history.push("/select");
        }
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // if (sessionToken) {
  //   // Hide form while sessionToken is converted into id/access tokens
  //   return null;
  // }

  return (
    <form onSubmit={handleSubmit}>

      <div class="form-group">
        <label for="username">Email address</label>
        <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email" value={username}
          onChange={handleUsernameChange} />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" value={password}
          onChange={handlePasswordChange} />
        <small id="passwordHelp" class="form-text text-muted">&nbsp;</small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  );
};
const mapStateToProps = state => {
  const { transaction } = state.authReducer;
  return { transaction };
}
export default connect(mapStateToProps, null)(SignInForm);