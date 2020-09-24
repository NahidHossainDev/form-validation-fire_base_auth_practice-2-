import React, { useState } from "react";
import Protector from "./Component/Protector/Protector";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./Component/NavBar/NavBar";
import ReactHookForm from "./Component/ReactHookForm/ReactHookForm";

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/defaultForm">
            <Protector></Protector>
          </Route>
          <Route path="/reactHookForm">
            <ReactHookForm></ReactHookForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
