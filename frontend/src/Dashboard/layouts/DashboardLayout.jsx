import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './DashboardLayout.css'; // N'oubliez pas de créer ce fichier CSS

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration des largeurs du drawer pour différentes tailles d'écran
  const drawerWidth = {
    lg: 280,
    md: 240,
    sm: 90
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
