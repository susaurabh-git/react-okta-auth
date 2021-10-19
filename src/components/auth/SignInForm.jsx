import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import oktaAuthClient from "../../utils/oktaAuthClient";

const SignInForm = (props) => {
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.actions.login(username, password);
    oktaAuthClient
      .signInWithCredentials({ username, password })
      .then((transaction) => {
        if (transaction.status === "MFA_REQUIRED") {
          props.actions.update(transaction);
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

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
export default SignInForm;
