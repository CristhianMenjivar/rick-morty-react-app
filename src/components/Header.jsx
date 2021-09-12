import React from "react";
import { NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";
import Image from "./Image";

const Header = () => {
  const { currentUser, loggedIn } = useUser();

  return (
    <div className="nav-bar">
      <NavLink className="link" activeClassName="active" exact to="/">
        Inicio
      </NavLink>
      <NavLink className="link" activeClassName="active" to="/favs">
        Favoritos
      </NavLink>
      <NavLink className="link" activeClassName="active" to="/login">
        {loggedIn
          ? currentUser?.displayName || "Cerrar sesión"
          : "Iniciar sesión"}
        {loggedIn && currentUser?.photoURL && (
          <Image
            style={{
              borderRadius: 50,
              width: 45,
              height: 45,
              marginLeft: 20,
            }}
            url={currentUser.photoURL}
            alt={currentUser.email}
          />
        )}
      </NavLink>
    </div>
  );
};

export default Header;
