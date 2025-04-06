// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import RevenueStatCard from '../components/cards/RevenueStatCard';
// import { CustomerChart } from '../components/Charts/CustomerChart';
// import { SalesChart } from '../components/Charts/SalesChart';
// import { apiServices } from '../../api';
// import './Revenue.css';

// const Revenue = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [revenueData, setRevenueData] = useState({
//     revenueTotal: 0,
//     evolutionTotal: 0,
//     revenueMensuel: 0,
//     evolutionMensuel: 0,
//     tauxRecouvrement: 0,
//     evolutionTaux: 0,
//     nombrePaiements: 0,
//     evolutionNombre: 0,
//     revenueParMois: Array(12).fill(0),
//     revenueParSemaine: Array(52).fill(0),
//     methodePaiement: {}
//   });

//   useEffect(() => {
//     const fetchRevenueData = async () => {
//       try {
//         setLoading(true);
//         const response = await apiServices.paiements.list();
//         const paiements = response.data || [];

//         // Calculer les revenus par période
//         const currentDate = new Date();
//         const currentYear = currentDate.getFullYear();
//         const currentMonth = currentDate.getMonth();

//         // Filtrer les paiements de l'année en cours
//         const paiementsAnnee = paiements.filter(p => 
//           new Date(p.date_paiement).getFullYear() === currentYear
//         );

//         // Filtrer les paiements du mois en cours
//         const paiementsMois = paiementsAnnee.filter(p => 
//           new Date(p.date_paiement).getMonth() === currentMonth
//         );

//         // Calculer les totaux
//         const totalAnnee = paiementsAnnee.reduce((sum, p) => sum + p.montant, 0);
//         const totalMois = paiementsMois.reduce((sum, p) => sum + p.montant, 0);

//         // Calculer les revenus par mois
//         const revenueParMois = Array(12).fill(0);
//         paiementsAnnee.forEach(p => {
//           const mois = new Date(p.date_paiement).getMonth();
//           revenueParMois[mois] += p.montant;
//         });

//         // Calculer le taux de recouvrement
//         const tauxRecouvrement = (paiementsMois.length / paiementsAnnee.length) * 100;

//         // Calculer les méthodes de paiement
//         const methodePaiement = paiementsAnnee.reduce((acc, p) => {
//           acc[p.methode_paiement] = (acc[p.methode_paiement] || 0) + p.montant;
//           return acc;
//         }, {});

//         setRevenueData({
//           revenueTotal: totalAnnee,
//           evolutionTotal: 15, // À calculer avec les données historiques
//           revenueMensuel: totalMois,
//           evolutionMensuel: 8, // À calculer avec les données historiques
//           tauxRecouvrement: Math.round(tauxRecouvrement),
//           evolutionTaux: 5, // À calculer avec les données historiques
//           nombrePaiements: paiementsMois.length,
//           evolutionNombre: 10, // À calculer avec les données historiques
//           revenueParMois,
//           methodePaiement
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error("Erreur lors du chargement des données:", err);
//         setError("Erreur lors du chargement des données");
//         setLoading(false);
//       }
//     };

//     fetchRevenueData();
//   }, []);

//   const revenueChartData = {
//     labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
//     datasets: [
//       {
//         label: 'Revenus mensuels',
//         data: revenueData.revenueParMois,
//         borderColor: '#4CAF50',
//         backgroundColor: 'rgba(76, 175, 80, 0.1)',
//         tension: 0.4
//       }
//     ]
//   };

//   const methodePaiementData = {
//     labels: Object.keys(revenueData.methodePaiement),
//     datasets: [{
//       data: Object.values(revenueData.methodePaiement),
//       backgroundColor: ['#FF6B6B', '#4CAF50', '#FF9F43', '#9C27B0']
//     }]
//   };

//   if (loading) return <div className="loading">Chargement...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="revenue-page">
//       <div className="revenue-header">
//         <div>
//           <h1>Revenus</h1>
//           <p>Aperçu des revenus et statistiques</p>
//         </div>
//         <button className="export-btn">
//           <FontAwesomeIcon icon={faDownload} />
//           Exporter
//         </button>
//       </div>

//       <RevenueStatCard data={revenueData} />

//       <div className="revenue-charts">
//         <div className="chart-card">
//           <h3>Évolution des Revenus</h3>
//           <CustomerChart data={revenueChartData} />
//         </div>

//         <div className="chart-card">
//           <h3>Méthodes de Paiement</h3>
//           <SalesChart data={methodePaiementData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Revenue;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import RevenueStatCard from '../components/cards/RevenueStatCard';
import { CustomerChart } from '../components/Charts/CustomerChart';
import { SalesChart } from '../components/Charts/SalesChart';
import { apiServices } from '../../api';
import './Revenue.css';

const Revenue = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState({
    revenueTotal: 0,
    revenueMensuel: 0,
    paiementsMensuels: 0,
    revenueMoisPrecedent: 0,
    variationMoisPrecedent: 0,
    revenueAnneePrecedente: 0,
    variationAnneePrecedente: 0,
    sommeAttendueMois: 0, // Nouveau: somme attendue pour le mois sélectionné
    nombrePaiements: 0,
    revenueParMois: Array(12).fill(0),
    revenueAttenduParMois: Array(12).fill(0),
    methodePaiement: {}
  });

  const formatNumber = (num) => {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        
        const contratsResponse = await apiServices.contrats.list();
        const contrats = contratsResponse.data || [];
        
        const paiementsResponse = await apiServices.paiements.list();
        const paiements = paiementsResponse.data || [];

        const currentDate = new Date();
        const previousMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
        const previousMonthYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
        const previousYear = selectedYear - 1;

        // Calcul des revenus attendus et reçus par mois
        const revenueAttenduParMois = Array(12).fill(0);
        const revenueParMois = Array(12).fill(0);
        const revenueAttenduAnneePrecedente = Array(12).fill(0);
        const revenueParAnneePrecedente = Array(12).fill(0);

        // Calcul des sommes attendues par mois
        contrats.forEach(contrat => {
          const dateDebut = new Date(contrat.date_debut);
          const dateFin = new Date(contrat.date_fin);
          
          // Pour l'année sélectionnée
          for (let mois = 0; mois < 12; mois++) {
            const moisDate = new Date(selectedYear, mois, 1);
            if (moisDate >= dateDebut && moisDate <= dateFin) {
              revenueAttenduParMois[mois] += contrat.montant;
            }
          }
          
          // Pour l'année précédente
          for (let mois = 0; mois < 12; mois++) {
            const moisDate = new Date(previousYear, mois, 1);
            if (moisDate >= dateDebut && moisDate <= dateFin) {
              revenueAttenduAnneePrecedente[mois] += contrat.montant;
            }
          }
        });

        // Calcul des paiements effectués
        paiements.forEach(paiement => {
          const datePaiement = new Date(paiement.date_paiement);
          if (datePaiement.getFullYear() === selectedYear) {
            const mois = datePaiement.getMonth();
            revenueParMois[mois] += paiement.montant;
          }
          if (datePaiement.getFullYear() === previousYear) {
            const mois = datePaiement.getMonth();
            revenueParAnneePrecedente[mois] += paiement.montant;
          }
        });

        // Calcul des indicateurs
        const revenueMensuelAttendu = revenueAttenduParMois[selectedMonth];
        const paiementsMensuels = revenueParMois[selectedMonth];
        const revenueMoisPrecedent = revenueAttenduParMois[previousMonth];
        const revenueAnneePrecedente = revenueParAnneePrecedente.reduce((sum, val) => sum + val, 0);
        const totalAnnee = revenueParMois.reduce((sum, val) => sum + val, 0);

        const variationMoisPrecedent = revenueMoisPrecedent > 0 
          ? ((revenueMensuelAttendu - revenueMoisPrecedent) / revenueMoisPrecedent) * 100 
          : 0;

        const variationAnneePrecedente = revenueAnneePrecedente > 0 
          ? ((totalAnnee - revenueAnneePrecedente) / revenueAnneePrecedente) * 100 
          : 0;

        // Méthodes de paiement pour le mois sélectionné
        const paiementsMoisCourant = paiements.filter(p => {
          const datePaiement = new Date(p.date_paiement);
          return datePaiement.getFullYear() === selectedYear && 
                 datePaiement.getMonth() === selectedMonth;
        });

        const methodePaiement = paiementsMoisCourant.reduce((acc, p) => {
          acc[p.methode_paiement] = (acc[p.methode_paiement] || 0) + p.montant;
          return acc;
        }, {});

        setRevenueData({
          revenueTotal: totalAnnee,
          revenueMensuel: revenueMensuelAttendu,
          paiementsMensuels: paiementsMensuels,
          revenueMoisPrecedent: revenueMoisPrecedent,
          variationMoisPrecedent: variationMoisPrecedent,
          revenueAnneePrecedente: revenueAnneePrecedente,
          variationAnneePrecedente: variationAnneePrecedente,
          sommeAttendueMois: revenueMensuelAttendu, // Somme attendue pour le mois
          nombrePaiements: paiementsMoisCourant.length,
          revenueParMois,
          revenueAttenduParMois,
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
  }, [selectedMonth, selectedYear]);

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                     "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const revenueChartData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Revenus attendus (contrats)',
        data: revenueData.revenueAttenduParMois,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Paiements reçus',
        data: revenueData.revenueParMois,
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        tension: 0.4,
        fill: true
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

    <div className="month-navigation">
      <button onClick={() => navigateMonth('prev')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h2>{monthNames[selectedMonth]} {selectedYear}</h2>
      <button onClick={() => navigateMonth('next')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>

    <div className="revenue-cards-container">
      <RevenueStatCard 
        title="Revenu Mensuel"
        value={`${formatNumber(revenueData.revenueMensuel)}  MRU  ${formatNumber(revenueData.variationMoisPrecedent)} %`}
        secondaryValue={`Reçu: ${formatNumber(revenueData.paiementsMensuels)} MRU`}
        comparisonLabel={`variation par rapport au mois précédent( ${monthNames[selectedMonth - 1]}): `}
        variation={revenueData.variationMoisPrecedent}
      />
      
      <RevenueStatCard 
        title="Revenu Annuel"
        value={`${formatNumber(revenueData.revenueTotal)} MRU`}
        comparisonValue={`${formatNumber(revenueData.revenueAnneePrecedente)} MRU`}
        comparisonLabel="Année précédente"
        variation={revenueData.variationAnneePrecedente}
      />
      
      <RevenueStatCard 
        title="Somme Attendue"
        value={`${formatNumber(revenueData.sommeAttendueMois)} MRU`}
        secondaryValue={`${revenueData.nombrePaiements} paiements`}
        comparisonLabel="Le total attendu pour le mois courant en se base sur les contrats actifs"
        variation={0} // Pas de variation pour la somme attendue

      />
    </div>

    <div className="revenue-charts">
      <div className="chart-card">
        <h3>Évolution annuelle des Revenus</h3>
        <CustomerChart data={revenueChartData} />
      </div>
      
      <div className="chart-card">
        <h3>Méthodes de Paiement ({monthNames[selectedMonth]})</h3>
        <SalesChart data={methodePaiementData} />
      </div>
    </div>
  </div>
);
};

export default Revenue;