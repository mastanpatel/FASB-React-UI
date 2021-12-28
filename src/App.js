import React, { useState } from "react";
import "./App.scss";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Home from './components/Home';
import Footer from "./components/Footer";

import ManageQuarter from "./components/ManageQuarter";
import InputWizard from "./components/InputWizard";
import Inventory from "./components/Inventory";
import Control from "./components/Control";
import Reports from "./components/Reports";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Router>
      <div className="content">
        <div className="logoBar">
          <div className="project-name d-flex">
            <span className="mx-0 my-auto logo">FASB 167</span>
          </div>
          <div>
            <span>Welcome Mastan!</span>
            <LogoutButton />
          </div>
        </div>
        <div className="main-content">
          <Header projectName={"FASB 167"} />
          <div class="vl"></div>
          <Route exact path="/" component={ManageQuarter} />
          <Route path="/ManageQuarter" component={ManageQuarter} />
          <Route path="/InputWizard" component={InputWizard} />
          <Route path="/Inventory" component={Inventory} />
          <Route path="/Control" component={Control} />
          <Route path="/Reports" component={Reports} />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Router>
  ) : (
    <button onClick={() => loginWithRedirect()}>Please Login.</button>
  );
}

export default App;
