import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);
  // const authenticated = true;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}
