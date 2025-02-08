import React, { useState } from 'react';
import { apartmentsData } from '../data/Data';
import { useNavigate } from 'react-router-dom';
import './Properties.css';

const ApartmentsList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
    
  const handleBackClick = () => {
    navigate('/services');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };


  const handleDetailsClick = (apartmentId) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;

    }

    setExpandedId(expandedId === apartmentId ? null : apartmentId);
  };

  const handleRentClick = (apartmentId) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;

    }

    navigate(`/rent-form/${apartmentId}`);
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
      <h2>Appartements disponibles</h2>
      <div className="properties-grid">
        {apartmentsData.map((apartment) => (
          <div 
            key={apartment.id} 
            className={`property-card ${expandedId === apartment.id ? 'expanded' : ''}`}
          >
            <div className="property-image">
              <img src={apartment.image} alt={apartment.title} />
            </div>
            
            <div className="property-info">
              <h3>{apartment.title}</h3>

              {expandedId === apartment.id && (
                <div className="expanded-content">
                  <p className="location">
                    <i className="fa fa-map-marker"></i> {apartment.location}
                  </p>

                  <div className="basic-info">
                    <div className="property-details">
                      <span><i className="fa fa-bed"></i> {apartment.bedrooms} chambres</span>
                      <span><i className="fa fa-bath"></i> {apartment.bathrooms} SDB</span>
                      <span><i className="fa fa-square"></i> {apartment.surface}</span>
                    </div>
                    <p className="price">{apartment.price} MRU/mois</p>
                  </div>

                  <div className="expanded-info">
                    <p className="description">{apartment.description}</p>
                    <div className="additional-details">
                      <h4>Caractéristiques</h4>
                      <ul>
                        {apartment.features?.map((feature, index) => (
                          <li key={index}><i className="fa fa-check"></i> {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      className="rent-button"
                      onClick={() => handleRentClick(apartment.id)}
                    >
                      Louer maintenant
                    </button>
                  </div>
                </div>
              )}

              <button 
                className="details-button"
                onClick={() => handleDetailsClick(apartment.id)}
              >
                {expandedId === apartment.id ? 'Voir moins' : 'Voir plus'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentsList; 