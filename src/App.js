import React, { useEffect } from "react";
import axios from "./axios";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("getImages/45");
      console.log(request);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
