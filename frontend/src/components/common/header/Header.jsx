import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data"; // Assurez-vous que cette liste ne contient pas Login/Signup
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  const handleLoginClick = () => {
    navigate("/login");
    window.scrollTo({ 
      top: 0,
      behavior: 'instant' // Changement immédiat sans animation
    });
  };


  const handleLogout = () => {
    // Supprimer les tokens et rediriger
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Changement immédiat sans animation
    });
  };


  const handleNavClick = (path) => {
    // Vérifier si l'utilisateur est connecté pour certaines routes
    if (path.includes('/properties/') && !isAuthenticated) {
      navigate('/login');
      return;
    }
    
    navigate(path);
    setNavList(false);
    // Empêcher le comportement par défaut qui fait défiler jusqu'au footer
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Changement immédiat sans animation
    });
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo" >
            <img src="/images/logo2.png" alt="Baghari Logo" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {/* Rendu des autres liens sauf Login/Signup */}
              {nav
                .filter((list) => list.text !== "Login" && list.text !== "Signup") // Filtrer les liens à exclure
                .map((list, index) => (
                  <li key={index}>
                    <Link 
                      to={list.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(list.path);
                      }}
                      className={location.pathname === list.path ? "active" : ""}
                    >
                      {list.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="button flex">
            {isAuthenticated ? (
              <img 
              src="/images/logout.png"
              alt="Déconnexion"
              className="logout-icon"
              onClick={handleLogout}
              title="Déconnexion"
            />
            ) : (
              <button className="btn1" onClick={handleLoginClick}>
                <i className="fa fa-sign-in"></i> Se Connecter
              </button>
            )}
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
