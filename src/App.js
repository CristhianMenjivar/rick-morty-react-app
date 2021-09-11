import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import Routes from "./Routes";

import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="nav-bar">
          <NavLink className="link" activeClassName="active" exact to="/">
            Inicio
          </NavLink>
          <NavLink className="link" activeClassName="active" to="/favs">
            Favoritos
          </NavLink>
          <NavLink className="link" activeClassName="active" to="/login">
            Login
          </NavLink>
        </div>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
