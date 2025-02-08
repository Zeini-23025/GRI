import React, { useState } from 'react';
import { housesData } from '../data/Data';
import { useNavigate } from 'react-router-dom';
import './Properties.css';

const HousesList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
    
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

    navigate(`/rent-form/${houseId}`);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };


  return (
    <div className="properties-container">
      <div className="back-button" onClick={handleBackClick}>
        <img src="/images/back.png" alt="Retour" title="Retour aux catégories" />
      </div>
      <h2>Maisons & Villas disponibles</h2>
      <div className="properties-grid">
        {housesData.map((house) => (
          <div 
            key={house.id} 
            className={`property-card ${expandedId === house.id ? 'expanded' : ''}`}
          >
            <div className="property-image">
              <img src={house.image} alt={house.title} />
            </div>
            
            <div className="property-info">
              <h3>{house.title}</h3>

              {expandedId === house.id && (
                <div className="expanded-content">
                  <p className="location">
                    <i className="fa fa-map-marker"></i> {house.location}
                  </p>

                  <div className="basic-info">
                    <div className="property-details">
                      <span><i className="fa fa-bed"></i> {house.bedrooms} chambres</span>
                      <span><i className="fa fa-bath"></i> {house.bathrooms} SDB</span>
                      <span><i className="fa fa-square"></i> {house.surface}</span>
                    </div>
                    <p className="price">{house.price} MRU/mois</p>
                  </div>

                  <div className="expanded-info">
                    <p className="description">{house.description}</p>
                    <div className="additional-details">
                      <h4>Caractéristiques</h4>
                      <ul>
                        {house.features?.map((feature, index) => (
                          <li key={index}><i className="fa fa-check"></i> {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      className="rent-button"
                      onClick={() => handleRentClick(house.id)}
                    >
                      Louer maintenant
                    </button>
                  </div>
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