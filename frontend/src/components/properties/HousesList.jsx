import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../api';
import './Properties.css';

const HousesList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await apiServices.immobiliers.list();
        // Filtrer pour n'obtenir que les maisons
        const housesList = response.data.filter(item => item.type === 'Maison');
        console.log('response', housesList);
        setHouses(housesList);
      } catch (error) {
        console.error('Erreur lors du chargement des maisons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleBackClick = () => {
    navigate('/services');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  const handleDetailsClick = (houseId) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;
    }

    setExpandedId(expandedId === houseId ? null : houseId);
  };

  const handleRentClick = (houseId) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;
    }
    navigate(`/demandes/${3}`);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="properties-container">
      <div className="back-button" onClick={handleBackClick}>
        <img src="/images/back.png" alt="Retour" title="Retour aux catégories" />
      </div>
      <h2>Maisons & Villas disponibles</h2>
      <div className="properties-grid">
        {houses.map((house) => (
          <div 
            key={house.id} 
            className={`property-card ${expandedId === house.id ? 'expanded' : ''}`}
          >
            <div className="property-image">
              {house.image ? (
                <img 
                  src={`${apiServices.defaults.baseURL}${house.image}`} 
                  alt={house.nom} 
                  onError={(e) => {
                    e.target.src = '/images/default-property.png';
                  }}
                />
              ) : (
                <img src="/images/default-property.png" alt="Image par défaut" />
              )}
            </div>
            
            <div className="property-info">
              <h3>{house.nom}</h3>

              {expandedId === house.id && (
                <div className="expanded-content">
                  <p className="location">
                    <i className="fa fa-map-marker"></i> {house.adresse}
                  </p>

                  <div className="basic-info">
                    <div className="property-details">
                      <span><i className="fa fa-square"></i> {house.superficie} m²</span>
                    </div>
                    <p className="price">{house.montant} MRU/mois</p>
                  </div>

                  <button 
                    className="rent-button"
                    onClick={() => handleRentClick(house.id)}
                  >
                    Louer maintenant
                  </button>
                </div>
              )}

              <button 
                className="details-button"
                onClick={() => handleDetailsClick(house.id)}
              >
                {expandedId === house.id ? 'Voir moins' : 'Voir plus'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousesList;