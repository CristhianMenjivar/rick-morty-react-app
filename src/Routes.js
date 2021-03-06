import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/HomePage";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";
import useUser from "./hooks/useUser";

const PrivateRoute = ({ path, component, ...rest }) => {
  const { loggedIn } = useUser();

  if (loggedIn) return <Route exact path="/" component={component} {...rest} />;
  else return <Redirect to="/login" {...rest} />;
};

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/favs" component={FavPage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  );
}
