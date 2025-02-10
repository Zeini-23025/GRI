import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTableCells,
  faCog,
  faSignOutAlt,
  faSearch,
  faComments,
  faFolder,
  faShoppingCart,
  faHeart,
  faBars,
  faCode,
  faMoneyBillTransfer,

} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLogout } from '../../components/common/header/logout';

import './Sidebar.css'; 

function Sidebar({ isOpen, setIsOpen }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const handleLogout = useLogout();

  const handleSubmenuClick = (index, e) => {
    e.preventDefault(); // Prevent navigation
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const menuItems = [
    { 
      icon: faHome, 
      text: 'Dashboard', 
      path: '/dashboard',
    },
    { 
      icon: faMoneyBillTransfer, 
      text: 'Transactions', 
      path: '/dashboard/transactions',
      subItems: [
        { text: 'Recent', path: '/dashboard/transactions' },
        { text: 'History', path: '/dashboard/transactions/history' }
      ]
    },
    { icon: faCog, text: 'Revenue', path: '/dashboard/revenues' },
    { icon: faCog, text: 'Retad', path: '/dashboard/retard' },
    { icon: faComments, text: 'Statistique', path: '/dashboard/statistique' },
    { 
      icon: faTableCells,
      text: 'Tables',
      path: '/dashboard/gestion-des-tables',
      subItems: [
        { text: 'Immobiliers', path: '/dashboard/gestion-des-tables/immobilier' },
        { text: 'Types', path: '/dashboard/gestion-des-tables/types' },
        { text: 'Contrats', path: '/dashboard/gestion-des-tables/contrat' },
        { text: 'Paiements', path: '/dashboard/gestion-des-tables/paiement' },
        { text: 'Utilisateurs', path: '/dashboard/gestion-des-tables/utilisateur' },
      ]
    },

    { icon: faCog, text: 'Setting', path: '/dashboard/settings' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo Section */}
      <div className="logo-details">
        <div className={`logo-content ${!isOpen ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faCode} className="icon" />
          <span className="logo-name">CodingLab</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Navigation List */}
      <div className="nav-list-container">
        <ul className="nav-list">
          {/* Search Bar */}
          <li className="search-box">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder={isOpen ? "Search..." : ""}
                className="search-input"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
              />
            </div>
          </li>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path} 
                className="nav-link"
                onClick={(e) => item.subItems && handleSubmenuClick(index, e)}
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                <span className={`nav-text ${!isOpen && 'hidden'}`}>
                  {item.text}
                </span>
                {!isOpen && <span className="tooltip">{item.text}</span>}
              </Link>
              {item.subItems && (
                <ul className={`sub-menu ${activeSubmenu === index ? 'active' : ''}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.path} className="sub-link">
                        {subItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Sidebar;