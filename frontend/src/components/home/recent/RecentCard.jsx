import React, { useState } from "react"
import { list } from "../../data/Data"
import { useNavigate } from "react-router-dom"
import "./Recent.css"

const RecentCard = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleCardClick = (property) => {
    const isAuthenticated = localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      navigate('/login');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    setSelectedProperty(property);
  };

  const handleRentClick = (id) => {
    navigate(`/rent-form/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };


  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((property, index) => {
          const { cover, category, location, name, price, type } = property
          return (
            <div 
              className='box shadow' 
              key={index} 
              onClick={() => handleCardClick(property)}
              style={{ cursor: 'pointer' }}
            >
              <div className='img-container'>
                <img src={cover} alt={name} />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ 
                    background: "#ff98001a",
                    color: "#ff9800"
                  }}>
                    {category}
                  </span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label>MRU/mois</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal pour les détails de la propriété */}
      {selectedProperty && (
        <div className="property-modal-overlay" onClick={handleCloseModal}>
          <div className="property-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-close" onClick={handleCloseModal}>
              <img 
                src="/images/close.png" 
                alt="Fermer" 
                title="Fermer"
              />
            </div>
            
            <div className="modal-image">
              <img src={selectedProperty.cover} alt={selectedProperty.name} />
            </div>

            <div className="modal-details">
              <h2>{selectedProperty.name}</h2>
              
              <div className="modal-info">
                <div className="info-section location">
                  <h3><i className="fa fa-map-marker"></i> Localisation</h3>
                  <p>{selectedProperty.location}</p>
                </div>

                <div className="info-section price">
                  <h3><i className="fa fa-money"></i> Prix</h3>
                  <p><strong>{selectedProperty.price}</strong> MRU/mois</p>
                </div>

                <div className="info-section type">
                  <h3><i className="fa fa-building"></i> Type</h3>
                  <p>{selectedProperty.type}</p>
                </div>
              </div>

              <div className="property-details">
                <h3>Détails de la propriété</h3>
                <div className="details-grid">
                  {selectedProperty.surface && (
                    <div className="detail-item">
                      <i className="fa fa-square"></i>
                      <span>Surface: {selectedProperty.surface}</span>
                    </div>
                  )}
                  
                  {selectedProperty.bedrooms && (
                    <div className="detail-item">
                      <i className="fa fa-bed"></i>
                      <span>{selectedProperty.bedrooms} Chambres</span>
                    </div>
                  )}
                  
                  {selectedProperty.bathrooms && (
                    <div className="detail-item">
                      <i className="fa fa-bath"></i>
                      <span>{selectedProperty.bathrooms} Salles de bain</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedProperty.description && (
                <div className="description-section">
                  <h3>Description</h3>
                  <p>{selectedProperty.description}</p>
                </div>
              )}

              {selectedProperty.features && (
                <div className="features-section">
                  <h3>Caractéristiques</h3>
                  <ul className="features-grid">
                    {selectedProperty.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fa fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                className="rent-button"
                onClick={() => handleRentClick(selectedProperty.id)}
              >
                Louer maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RecentCard
