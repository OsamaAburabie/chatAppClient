import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function AuthRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === true ? <Redirect to={"/"} /> : <Component {...props} />
      }
    />
  );
}
