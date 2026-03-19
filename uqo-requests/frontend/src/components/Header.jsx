import React from "react";
import LoginLogiq from "./LoginLogiq";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="uqr-nav">
      <div className="uqr-navBrand">
        <div className="uqr-navLogo" aria-hidden="true">UQO</div>
        <span className="uqr-navName">Group11-Uqo-request</span>
      </div>

      <ul className="uqr-navLinks">
        <li>
            <NavLink to="/" className="uqr-link">
                Accueil
            </NavLink>
        </li>
        <li>
            <NavLink to="/login" className="uqr-link">
                Connexion
            </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="uqr-link">
                Tableau de bord
            </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
