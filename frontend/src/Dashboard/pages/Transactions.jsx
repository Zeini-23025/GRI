import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faCheck, 
  faTimes, 
  faEye 
} from '@fortawesome/free-solid-svg-icons';
import TransactionStatCard from '../components/cards/TransactionStatCard';
import { CustomerChart } from '../components/Charts/CustomerChart';
import { apiServices } from '../../api';
import './Transactions.css';

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [statsData, setStatsData] = useState({
    enAttente: 0,
    enRetard: 0,
    confirmes: 0,
    annules: 0,
    evolutionAttente: 0,
    evolutionRetard: 0,
    evolutionConfirmes: 0,
    evolutionAnnules: 0
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await apiServices.paiements.list();
      const paiements = response.data || [];

      // Calculer les statistiques basées sur les données du sérialiseur
      const stats = {
        enAttente: paiements.filter(p => p.statut === 'En attente').length,
        enRetard: paiements.filter(p => p.statut === 'Retard').length,
        confirmes: paiements.filter(p => p.statut === 'Payé').length,
        annules: paiements.filter(p => p.statut === 'Annulé').length,
        evolutionAttente: (paiements.filter(p => p.statut === 'En attente').length/paiements.length*100 ).toFixed(2), // À calculer avec des données historiques
        evolutionRetard: (paiements.filter(p => p.statut === 'Retard').length/paiements.length*100).toFixed(2),
        evolutionConfirmes: (paiements.filter(p => p.statut === 'Payé').length/paiements.length*100).toFixed(2),
        evolutionAnnules: (paiements.filter(p => p.statut === 'Annulé').length/paiements.length*100).toFixed(2)
      };

      setStatsData(stats);
      setTransactions(paiements);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du chargement des transactions:", err);
      setError("Erreur lors du chargement des données");
      setLoading(false);
    }
  };

  const handleStatusChange = async (transactionId, newStatus, transaction) => {
    try {
      await apiServices.paiements.update(transactionId, { 
        id_contrat: transaction.contrat,
        id_mois : transaction.id_mois,
        montant: transaction.montant,
        methode_paiement: transaction.methode_paiement,
        statut: newStatus,
      
      });

      if (newStatus === 'Payé') {
        const newNotification = {
          type: "Comfirmation du paiment",
          message: `Votre paiment a pour le mois de ${transaction.id_mois} a ete confirmé`,
          id_utilisateur: transaction.id_locataire,
        };
    
        await handleNotificationClient(newNotification);
      }else if (newStatus === 'Annulé') {
        const newNotification = {
          type: "Annulation du paiment",
          message: `Votre paiment a pour le mois de ${transaction.id_mois} a ete annulé.
          veuillez contacter l'administrateur pour plus de détails ou verifier votre paiement`,
          id_utilisateur: transaction.id_locataire,
        };
        await handleNotificationClient(newNotification);
      }

      fetchTransactions(); // Rafraîchir les données
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err);
    }
  };

  const filteredTransactions = selectedStatus === 'all' 
    ? transactions 
    : transactions.filter(t => t.statut.toLowerCase() === selectedStatus);

  const getStatusColor = (status) => {
    const colors = {
      'En attente': 'orange',
      'Retard': 'red',
      'Payé': 'green',
      'Annulé': 'gray'
    };
    return colors[status] || 'gray';
  };

  const handleNotificationClient = async (newNotification) => {
      try {
        // setProcessingId(newNotification);
    
        // Créer une nouvelle notification pour éviter la mutation directe
        // const newNotification = {
        //   type: "Comfirmation du paiment",
        //   message: `Votre paiment a pour le mois de ${mois} a ete acceptée`,
        //   id_utilisateur: user_id,
        // };
    
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
     

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p>Gestion des paiements </p>
        </div>
      </div>

      <TransactionStatCard data={statsData} />

      <div className="transactions-filters">
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">Tous les statuts</option>
          <option value="en attente">En attente</option>
          <option value="retard">En retard</option>
          <option value="payé">Confirmés</option>
          <option value="annulé">Annulés</option>
        </select>
      </div>

      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Mois</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Méthode</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.locataire}</td>
                <td>{transaction.mois}</td>
                <td>{transaction.montant.toLocaleString()} MRU</td>
                <td>{new Date(transaction.date_paiement).toLocaleDateString()}</td>
                <td>{transaction.methode_paiement}</td>
                <td>
                  <span className={`status-bg  ${getStatusColor(transaction.statut)}`}>
                    {transaction.statut}
                  </span>
                </td>
                <td className="actions-cell">
                  {transaction.statut == 'En attente' && (
                    <button 
                      className="action-btn confirm"
                      onClick={() => handleStatusChange(transaction.id, 'Payé', transaction)}
                      title="Confirmer"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                  {transaction.statut == 'En attente' && (
                    <button 
                      className="action-btn cancel"
                      onClick={() => handleStatusChange(transaction.id, 'Annulé', transaction)}
                      title="Annuler"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                  <button 
                    className="action-btn view"
                    onClick={() => {/* Ajouter la logique de visualisation */}}
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
    </div>
  );
};

export default Transactions;
