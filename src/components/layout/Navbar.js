import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const button =
    authState && authState.isAuthenticated ? (
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        onClick={() => {
          oktaAuth.signOut();
        }}
      >
        Logout
      </button>
    ) : (
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </button>
    );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <li className="nav-item">
          <Link className="navbar-brand" to="/">
            React Okta Auth
          </Link>
        </li>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/protected">
                Secure
              </Link>
            </li>
          </ul>
        </div>
        <form className="form-inline">{button}</form>
      </div>
    </nav>
  );
};

export default Navbar;
