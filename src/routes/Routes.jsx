import React, { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Home from "../pages/Home";
import AuthContext from "../context/AuthContext";
import Register from "../pages/Register";
import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Chating from "../pages/Chating";

export default function Routes() {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === null) {
    return null;
  }
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/chat/:chatId" component={Chating} />
        <AuthRoute path="/register" component={Register} />
        <AuthRoute path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
