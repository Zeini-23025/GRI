import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faTimes, 
  faEye,
  faSpinner 
} from '@fortawesome/free-solid-svg-icons';
import { apiServices } from '../../api';
import './Demandes.css';

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchDemandes = async () => {
    try {
      setLoading(true);
      const response = await apiServices.demandes.list();
      setDemandes(response.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des demandes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  // const handleInformerClien = async (demande) => {
  //   try {
  //     setProcessingId(demande.id);
  //     const response = await apiServices.demandes.informerClient(demande.id);
      
  //     if (response.data) {
  //       // await fetchDemandes();
  //       alert(response.data.message || "Client informé avec succès");
  //     }
  //   } catch (err) {
  //     console.error("Erreur lors de l'information du client:", err);
  //     alert(err.response?.data?.error || "Erreur lors de l'information du client");
  //   } finally {
  //     setProcessingId(null);
  //   }
  // }
  const handleNotificationClient = async (user_id) => {
    try {
      setProcessingId(user_id);
  
      // Créer une nouvelle notification pour éviter la mutation directe
      const newNotification = {
        type: "acceptation",
        message: "Votre demande a ete acceptée",
        id_utilisateur: user_id,
      };
  
      const response = await apiServices.Notifications.create(newNotification);
  
      if (response?.status === 201) {
        alert("Notification envoyée avec succès !");
      } else {
        alert("Problème lors de l'envoi de la notification.");
      }
  
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de la notification.");
    }
  };
   

  const handleAccepter = async (demande) => {
    try {
      setProcessingId(demande.id);
      const response = await apiServices.demandes.accepter(demande.id);
      
      if (response.data) {
        await fetchDemandes();
        alert(response.data.message || "Demande acceptée avec succès");
        const client =  await apiServices.utilisateurs.get(parseInt(demande.id_user));
        console.log(client) 
        handleNotificationClient(client.data.id)
        // const immobilier = await apiServices.immobiliers.get(parseInt(demande.immobilier.id));
        // console.log("immobilier", immobilier.data);
      }
    } catch (err) {
      console.error("Erreur lors de l'acceptation de la demande:", err);
      alert(err.response?.data?.error || "Erreur lors de l'acceptation de la demande");
    } finally {
      setProcessingId(null);
    }
  };

  const handleRefuser = async (demandeId) => {
    try {
      setProcessingId(demandeId);
      const response = await apiServices.demandes.refuser(demandeId);
      
      if (response.data) {
        await fetchDemandes();
        alert(response.data.message || "Demande refusée avec succès");
      }
    } catch (err) {
      console.error("Erreur lors du refus de la demande:", err);
      alert(err.response?.data?.error || "Erreur lors du refus de la demande");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredDemandes = demandes.filter(demande => 
    selectedStatus === 'all' ? true : demande.statut === selectedStatus
  );

  const handleViewDetails = (demande) => {
    setSelectedDemande(demande);
    setShowModal(true);
  };

  const renderActions = (demande) => {
    // N'afficher les boutons que si la demande est en attente
    if (demande.statut === 'en_attente') {
      const isProcessing = processingId === demande.id;
      return (
        <>
          <button 
            className="action-btn accept"
            onClick={() => handleAccepter(demande)}
            title="Acceptée"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
          </button>
          <button 
            className="action-btn reject"
            onClick={() => handleRefuser(demande.id)}
            title="Refusée"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faTimes} />
            )}
          </button>
        </>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin />
        <p>Chargement des demandes...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="demandes-page">
      <div className="demandes-header">
        <h1>Gestion des Demandes</h1>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">Toutes les demandes</option>
          <option value="en_attente">En attente</option>
          <option value="Acceptée">Acceptées</option>
          <option value="Refusée">Refusées</option>
        </select>
      </div>

      {filteredDemandes.length === 0 ? (
        <div className="no-demandes">
          <p>Aucune demande {selectedStatus !== 'all' ? `${selectedStatus}` : ''}</p>
        </div>
      ) : (
        <div className="demandes-table-container">
          <table className="demandes-table">
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Immobilier</th>
                <th>Date de début</th>
                <th>Durée (mois)</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.map((demande) => (
                <tr 
                  key={demande.id} 
                  className={demande.statut === 'refusee' ? 'refused-row' : ''}
                >
                  <td>{demande.nom_complet}</td>
                  <td>{demande.email}</td>
                  <td>{demande.telephone}</td>
                  <td>{demande.immobilier.nom}</td>
                  <td>{new Date(demande.date_debut).toLocaleDateString()}</td>
                  <td>{demande.duree}</td>
                  <td>
                    <span className={ `status-bg  ${demande.statut}`}>
                      {demande.statut.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {renderActions(demande)}
                    <button 
                      className="action-btn view"
                      onClick={() => handleViewDetails(demande)}
                      title="Voir les détails"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedDemande && (
        <div className="modal">
          <div className="modal-content">
            <h2>Détails de la demande</h2>
            <div className="demande-details">
              <p><strong>Nom:</strong> {selectedDemande.nom_complet}</p>
              <p><strong>Email:</strong> {selectedDemande.email}</p>
              <p><strong>Téléphone:</strong> {selectedDemande.telephone}</p>
              <p><strong>Immobilier:</strong> {selectedDemande.immobilier}</p>
              <p><strong>Date de début:</strong> {new Date(selectedDemande.date_debut).toLocaleDateString()}</p>
              <p><strong>Durée:</strong> {selectedDemande.duree} mois</p>
              <p><strong>Message:</strong> {selectedDemande.message || 'Aucun message'}</p>
              <p><strong>Statut:</strong> {selectedDemande.statut.replace('_', ' ')}</p>
              <p><strong>Date de la demande:</strong> {new Date(selectedDemande.date_demande).toLocaleString()}</p>
            </div>
            <button onClick={() => setShowModal(false)} className="close-modal">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demandes;
