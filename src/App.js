import React from "react";
import { Router } from "react-router-dom";
import Main from "./components/Main";
import history from "./utils/history";

const App = () => {
  return (
    <>
      <div className="container">
        <Router history={history}>
          <Main />
        </Router>
      </div>
    </>
  );
};

export default App;
