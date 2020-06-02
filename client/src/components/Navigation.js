import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Navigation() {
  return (
    <nav className="nav-list">
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
