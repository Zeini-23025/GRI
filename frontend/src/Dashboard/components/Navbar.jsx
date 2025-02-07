import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars,
  faBell, 
  faCog, 
  faEnvelopeOpen, 
  faSearch, 
  faSignOutAlt, 
  faUserShield 
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from John", read: false },
    { id: 2, message: "Meeting at 3 PM", read: false },
    { id: 3, message: "Project deadline tomorrow", read: true }
  ]);

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        {/* Menu Toggle Button */}
        <button className="toggle-btn" onClick={onToggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Search Bar */}
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        {/* Notifications */}
        <div className="nav-item">
          <button className="notification-btn">
            <FontAwesomeIcon icon={faBell} />
            {notifications.some(n => !n.read) && (
              <span className="notification-badge"></span>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="nav-item dropdown">
          <button className="profile-btn">
            <img
              src="/path/to/profile-image.jpg"
              alt="Profile"
              className="profile-image"
            />
            <span className="profile-name">John Doe</span>
          </button>
          <div className="dropdown-menu">
            <a href="#profile">
              <FontAwesomeIcon icon={faUserCircle} /> Profile
            </a>
            <a href="#settings">
              <FontAwesomeIcon icon={faCog} /> Settings
            </a>
            <a href="#messages">
              <FontAwesomeIcon icon={faEnvelopeOpen} /> Messages
            </a>
            <a href="#support">
              <FontAwesomeIcon icon={faUserShield} /> Support
            </a>
            <div className="dropdown-divider"></div>
            <a href="#logout" className="logout-link">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
