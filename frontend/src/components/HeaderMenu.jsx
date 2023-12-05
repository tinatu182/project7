import React from "react";
import { NavLink } from "react-router-dom";
import tools from "../tools";
import config from "../config";
import styles from "./HeaderMenu.module.scss";

const HeaderMenu = () => {
  const handleLogout = () => {
    tools.setCookie(config.APP_NAME + "-token", "");
  };
  return (
    <ul className={styles.MenuContainer}>
      <NavLink to="/profile">
        <li>Profile</li>
      </NavLink>
      <NavLink to="/login">
        <li onClick={handleLogout}>Sign Out</li>
      </NavLink>
    </ul>
  );
};

export default HeaderMenu;
