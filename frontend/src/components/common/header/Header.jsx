import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data"; // Assurez-vous que cette liste ne contient pas Login/Signup
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirection vers la page Login
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <h2>Ijari</h2>
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {/* Rendu des autres liens sauf Login/Signup */}
              {nav
                .filter((list) => list.text !== "Login" && list.text !== "Signup") // Filtrer les liens à exclure
                .map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="button flex">
            {/* Bouton Se Connecter */}
            <button className="btn1" onClick={handleLoginClick}>
              <i className="fa fa-sign-out"></i> Se Connecter
            </button>
          </div>
          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
