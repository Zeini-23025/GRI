import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCog, 
  faBell, 
  faLock, 
  faPalette,
  faLanguage,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [langue, setLangue] = useState('fr');
  const [emailPrefs, setEmailPrefs] = useState({
    newsletter: true,
    promotions: false,
    alerts: true
  });

  const handleEmailPrefChange = (pref) => {
    setEmailPrefs({
      ...emailPrefs,
      [pref]: !emailPrefs[pref]
    });
  };

  return (
    <div className={`parametres-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="parametres-title">
        <FontAwesomeIcon icon={faUserCog} className="icon-title" />
        Paramètres
      </h1>

      <div className="parametres-sections">
        {/* Section Compte */}
        <div className="parametres-section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faUserCog} className="icon" />
            Compte
          </h2>
          <div className="parametre-item">
            <label>Nom d'utilisateur</label>
            <input 
              type="text" 
              defaultValue="admin" 
              className="parametre-input"
            />
          </div>
          <div className="parametre-item">
            <label>Email</label>
            <input 
              type="email" 
              defaultValue="admin@example.com" 
              className="parametre-input"
            />
          </div>
        </div>

        {/* Section Notifications */}
        <div className="parametres-section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faBell} className="icon" />
            Notifications
          </h2>
          <div className="parametre-item toggle">
            <label>Activer les notifications</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="parametre-item">
            <label>Préférences d'emails</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={emailPrefs.newsletter}
                  onChange={() => handleEmailPrefChange('newsletter')}
                />
                Newsletter
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={emailPrefs.promotions}
                  onChange={() => handleEmailPrefChange('promotions')}
                />
                Promotions
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={emailPrefs.alerts}
                  onChange={() => handleEmailPrefChange('alerts')}
                />
                Alertes
              </label>
            </div>
          </div>
        </div>

        {/* Section Apparence */}
        <div className="parametres-section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faPalette} className="icon" />
            Apparence
          </h2>
          <div className="parametre-item toggle">
            <label>Mode sombre</label>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="parametre-item">
            <label>Langue</label>
            <select 
              value={langue}
              onChange={(e) => setLangue(e.target.value)}
              className="parametre-select"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Section Sécurité */}
        <div className="parametres-section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faLock} className="icon" />
            Sécurité
          </h2>
          <div className="parametre-item">
            <button className="btn-change-password">
              Changer le mot de passe
            </button>
          </div>
          <div className="parametre-item toggle">
            <label>Authentification à deux facteurs</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="parametres-actions">
        <button className="btn-save">Enregistrer les modifications</button>
        <button className="btn-cancel">Annuler</button>
      </div>
    </div>
  );
};

export default Settings;
