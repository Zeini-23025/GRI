import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../api';
import './Properties.css';

const ApartmentsList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await apiServices.immobiliers.list();
        // Filtrer pour n'obtenir que les appartements
        const apartmentsList = response.data.filter(item => item.type === 'Appartement');
        console.log('response', apartmentsList);
        setApartments(apartmentsList);
      } catch (error) {
        console.error('Erreur lors du chargement des appartements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  // Ajout des handlers manquants
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

    navigate(`/demandes/${apartmentId}`);
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
      <h2>Appartements disponibles</h2>
      <div className="properties-grid">
        {apartments.map((apartment) => (
          <div 
            key={apartment.id} 
            className={`property-card ${expandedId === apartment.id ? 'expanded' : ''}`}
          >
            <div className="property-image">
              <img src={apartment.image} alt={apartment.titre} />
            </div>
            
            <div className="property-info">
              <h3>{apartment.titre}</h3>

              {expandedId === apartment.id && (
                <div className="expanded-content">
                  <p className="location">
                    <i className="fa fa-map-marker"></i> {apartment.adresse}
                  </p>

                  <div className="basic-info">
                    <div className="property-details">
                      <span><i className="fa fa-bed"></i> {apartment.chambres} chambres</span>
                      <span><i className="fa fa-bath"></i> {apartment.salles_bain} SDB</span>
                      <span><i className="fa fa-square"></i> {apartment.superficie} m²</span>
                    </div>
                    <p className="price">{apartment.montant} MRU/mois</p>
                  </div>

                  <div className="expanded-info">
                    <p className="description">{apartment.description}</p>
                    <div className="additional-details">
                      <h4>Caractéristiques</h4>
                      <ul>
                        {apartment.caracteristiques?.map((feature, index) => (
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