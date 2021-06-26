import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { auth } from "./firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
