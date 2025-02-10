import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './DashboardLayout.css'; // N'oubliez pas de créer ce fichier CSS

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Configuration des largeurs du drawer pour différentes tailles d'écran
  const drawerWidth = {
    lg: 280,
    md: 240,
    sm: 90
  };

  // Générer le chemin de navigation
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(path => path);
    return paths.map((path, index) => {
      const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        name: formattedPath,
        url: url,
        isLast: index === paths.length - 1
      };
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Navbar */}
        <div className="dashboard-navbar">
          <Navbar onToggleSidebar={() => setIsOpen(!isOpen)} />
        </div>

        {/* Breadcrumb Header */}
        <div className="dashboard-breadcrumb">
          <div className="breadcrumb-content">
            <div className="breadcrumb-path">
              <Link to="/dashboard" className="breadcrumb-item">Acueil</Link>
              {generateBreadcrumbs().map((crumb, index) => (
                <React.Fragment key={crumb.url}>
                  <span className="breadcrumb-separator">»</span>
                  {crumb.isLast ? (
                    <span className="breadcrumb-item active">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.url} className="breadcrumb-item">
                      {crumb.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* <div className="breadcrumb-actions">
              <button className="upgrade-button">
                <span className="upgrade-icon">⭐</span>
                Plan Upgrade
              </button>
              <button className="export-button">
                <span className="export-icon">↓</span>
                Export Report
              </button>
            </div> */}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="dashboard-main">
          <Outlet />
        </div>
        
        {/* Footer */}
        <div className="dashboard-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
