import React, { useState } from 'react';
import { shopsData } from '../data/Data';
import { useNavigate } from 'react-router-dom';
import './Properties.css';

const ShopsList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
    
  const handleBackClick = () => {
    navigate('/services');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };



  const handleDetailsClick = (shopId) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;

    }

    setExpandedId(expandedId === shopId ? null : shopId);
  };

  const handleRentClick = (shopId) => {
    console.log('shopId', shopId);
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      return;
    }

    navigate(`/demandes/${shopId}`);
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
      <h2>Boutiques disponibles</h2>
      <div className="properties-grid">
        {shopsData.map((shop) => (
          <div 
            key={shop.id} 
            className={`property-card ${expandedId === shop.id ? 'expanded' : ''}`}
          >
            <div className="property-image">
              <img src={shop.image} alt={shop.title} />
            </div>
            
            <div className="property-info">
              <h3>{shop.title}</h3>

              {expandedId === shop.id && (
                <div className="expanded-content">
                  <p className="location">
                    <i className="fa fa-map-marker"></i> {shop.location}
                  </p>

                  <div className="basic-info">
                    <div className="property-details">
                      <span><i className="fa fa-square"></i> {shop.surface}</span>
                      <span><i className="fa fa-store"></i> Vitrine: {shop.vitrine}</span>
                    </div>
                    <p className="price">{shop.price} MRU/mois</p>
                  </div>

                  <div className="expanded-info">
                    <p className="description">{shop.description}</p>
                    <div className="additional-details">
                      <h4>Caractéristiques</h4>
                      <ul>
                        {shop.features?.map((feature, index) => (
                          <li key={index}><i className="fa fa-check"></i> {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      className="rent-button"
                      onClick={() => handleRentClick(shop.id)}
                    >
                      Louer maintenant
                    </button>
                  </div>
                </div>
              )}

              <button 
                className="details-button"
                onClick={() => handleDetailsClick(shop.id)}
              >
                {expandedId === shop.id ? 'Voir moins' : 'Voir plus'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopsList; 