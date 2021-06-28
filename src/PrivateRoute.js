import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./firebase";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        auth.currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
