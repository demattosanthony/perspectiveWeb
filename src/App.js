import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import AlbumView from "./components/albumViewComponents/AlbumView";
import ImageView from "./components/albumViewComponents/ImageView";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <body>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route path="/image/">
                <ImageView />
              </Route>
              <Route path="/album/:albumId/:title">
                <AlbumView />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>
      </div>
    </body>
  );
}

export default App;
