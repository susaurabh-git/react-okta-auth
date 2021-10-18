import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./AppWithRouterAccess";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <div>
      <div className="container">
        <Router>
          <Navbar />
          <AppWithRouterAccess />
        </Router>
      </div>
    </div>
  );
};

export default App;
