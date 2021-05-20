import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./components/Login";
import Home from "./components/Home";
import AlbumView from "./components/albumViewComponents/AlbumView";
import ImageView from "./components/albumViewComponents/ImageView";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
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
  );
}

export default App;
