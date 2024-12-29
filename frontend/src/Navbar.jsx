import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Navbar.css"; 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  return (
    <div className="navbar-container">
      {/* Header avec le bouton menu */}
      <div className="navbar-header">
        <button className="menu-button" onClick={toggleMenu}>
          ☰ Menu
        </button>
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      </div>

      {/* Menu (affiché uniquement si isMenuOpen est true) */}
      {isMenuOpen && (
        <nav className="navbar">
          <ul className="navbar-list">
            <li>Home</li>
            <li>Search</li>
            <li>Saved Properties</li>
            <li>Saved Searches</li>
            <li>Moving Center</li>
            <li>List a Property</li>
            <li>Manage Rentals</li>
            <li>Business Solutions</li>
            <li>Rent Calculator</li>
            <li>Rental Price Estimator</li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;