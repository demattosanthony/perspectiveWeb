import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import AlbumView from "./components/albumViewComponents/AlbumView";
import ImageView from "./components/albumViewComponents/ImageView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

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
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
