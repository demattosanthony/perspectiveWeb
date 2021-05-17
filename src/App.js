import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
