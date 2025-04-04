import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../api';
import './Properties.css';

const ShopsList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await apiServices.immobiliers.list();
        // Filtrer pour n'obtenir que les boutiques
        const shopsList = response.data.filter(item => item.id_type.nom === 'Boutique');
        setShops(shopsList);
      } catch (error) {
        console.error('Erreur lors du chargement des boutiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

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

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="properties-container">
      <div className="back-button" onClick={handleBackClick}>
        <img src="/images/back.png" alt="Retour" title="Retour aux catégories" />
      </div>
      <h2>Boutiques disponibles</h2>
      <div className="properties-grid">
        {shops.map((shop) => (
          <div 
            key={shop.id} 
            className={`property-card ${expandedId === shop.id ? 'expanded' : ''}`}
          >
            <div className="property-image">
              {shop.image ? (
                <img 
                  src={`${apiServices.defaults.baseURL}${shop.image}`} 
                  alt={shop.nom} 
                  onError={(e) => {
                    e.target.src = '/images/default-property.png';
                  }}
                />
              ) : (
                <img src="/images/default-property.png" alt="Image par défaut" />
              )}
            </div>
            
            <div className="property-info">
              <h3>{shop.nom}</h3>

              {expandedId === shop.id && (
                <div className="expanded-content">
                  <p className="location">
                    <i className="fa fa-map-marker"></i> {shop.adresse}
                  </p>

                  <div className="basic-info">
                    <div className="property-details">
                      <span><i className="fa fa-square"></i> {shop.superficie} m²</span>
                    </div>
                    <p className="price">{shop.montant} MRU/mois</p>
                  </div>

                  <button 
                    className="rent-button"
                    onClick={() => handleRentClick(shop.id)}
                  >
                    Louer maintenant
                  </button>
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