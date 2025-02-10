import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import RevenueStatCard from '../components/cards/RevenueStatCard';
import { CustomerChart } from '../components/Charts/CustomerChart';
import { SalesChart } from '../components/Charts/SalesChart';
import { apiServices } from '../../api';
import './Revenue.css';

const Revenue = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState({
    revenueTotal: 0,
    evolutionTotal: 0,
    revenueMensuel: 0,
    evolutionMensuel: 0,
    tauxRecouvrement: 0,
    evolutionTaux: 0,
    nombrePaiements: 0,
    evolutionNombre: 0,
    revenueParMois: Array(12).fill(0),
    revenueParSemaine: Array(52).fill(0),
    methodePaiement: {}
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const response = await apiServices.paiements.list();
        const paiements = response.data || [];

        // Calculer les revenus par période
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Filtrer les paiements de l'année en cours
        const paiementsAnnee = paiements.filter(p => 
          new Date(p.date_paiement).getFullYear() === currentYear
        );

        // Filtrer les paiements du mois en cours
        const paiementsMois = paiementsAnnee.filter(p => 
          new Date(p.date_paiement).getMonth() === currentMonth
        );

        // Calculer les totaux
        const totalAnnee = paiementsAnnee.reduce((sum, p) => sum + p.montant, 0);
        const totalMois = paiementsMois.reduce((sum, p) => sum + p.montant, 0);

        // Calculer les revenus par mois
        const revenueParMois = Array(12).fill(0);
        paiementsAnnee.forEach(p => {
          const mois = new Date(p.date_paiement).getMonth();
          revenueParMois[mois] += p.montant;
        });

        // Calculer le taux de recouvrement
        const tauxRecouvrement = (paiementsMois.length / paiementsAnnee.length) * 100;

        // Calculer les méthodes de paiement
        const methodePaiement = paiementsAnnee.reduce((acc, p) => {
          acc[p.methode_paiement] = (acc[p.methode_paiement] || 0) + p.montant;
          return acc;
        }, {});

        setRevenueData({
          revenueTotal: totalAnnee,
          evolutionTotal: 15, // À calculer avec les données historiques
          revenueMensuel: totalMois,
          evolutionMensuel: 8, // À calculer avec les données historiques
          tauxRecouvrement: Math.round(tauxRecouvrement),
          evolutionTaux: 5, // À calculer avec les données historiques
          nombrePaiements: paiementsMois.length,
          evolutionNombre: 10, // À calculer avec les données historiques
          revenueParMois,
          methodePaiement
        });

        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const revenueChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Revenus mensuels',
        data: revenueData.revenueParMois,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4
      }
    ]
  };

  const methodePaiementData = {
    labels: Object.keys(revenueData.methodePaiement),
    datasets: [{
      data: Object.values(revenueData.methodePaiement),
      backgroundColor: ['#FF6B6B', '#4CAF50', '#FF9F43', '#9C27B0']
    }]
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="revenue-page">
      <div className="revenue-header">
        <div>
          <h1>Revenus</h1>
          <p>Aperçu des revenus et statistiques</p>
        </div>
        <button className="export-btn">
          <FontAwesomeIcon icon={faDownload} />
          Exporter
        </button>
      </div>

      <RevenueStatCard data={revenueData} />

      <div className="revenue-charts">
        <div className="chart-card">
          <h3>Évolution des Revenus</h3>
          <CustomerChart data={revenueChartData} />
        </div>

        <div className="chart-card">
          <h3>Méthodes de Paiement</h3>
          <SalesChart data={methodePaiementData} />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
