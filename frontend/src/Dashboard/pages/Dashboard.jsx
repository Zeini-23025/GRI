// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faUsers, 
//   faShoppingBag, 
//   faBoxes,
//   faUserPlus,
//   faChartLine,
//   faDownload
// } from '@fortawesome/free-solid-svg-icons';
// import TargetChart from '../components/Charts/TargetChart';
// import {SalesChart} from "../components/Charts/SalesChart"
// import {CustomerChart} from "../components/Charts/CustomerChart"
// import StatCard from '../components/cards/StatCard';
// import './Dashboard.css';

// const Dashboard = () => {
//   // Données pour les cartes statistiques
//   const statsData = [
//     {
//       title: "Total Revenues",
//       value: "3,234,567 MRU",
//       trend: "+17% de plus que le mois dernier",
//       icon: faShoppingBag,
//       color: "pink"
//     },
//     {
//       title: "Total Retards",
//       value: "700,000 MRU",
//       trend: "+8% des revenue de cette mois",
//       icon: faBoxes,
//       color: "rouge"

//     },
//     {
//       title: "Products Sold",
//       value: "5",
//       trend: "+2.3% from yesterday",
//       icon: faShoppingBag,
//       color: "green"
//     },
//     {
//       title: "New Customers",
//       value: "8",
//       trend: "+0.5% from yesterday",
//       icon: faUserPlus,
//       color: "purple"
//     }
//   ];

//   // Données pour les graphiques
//   const visitorData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: 'New Customers',
//         data: [200, 300, 250, 180, 220, 280, 300, 260, 220, 190, 180, 150],
//         borderColor: '#FF6B6B',
//         tension: 0.4
//       },
//       {
//         label: 'Loyal Customers',
//         data: [180, 250, 220, 200, 240, 260, 270, 250, 240, 220, 200, 180],
//         borderColor: '#4C6FFF',
//         tension: 0.4
//       },
//       {
//         label: 'Unique Customers',
//         data: [150, 220, 200, 170, 200, 230, 250, 230, 220, 200, 180, 160],
//         borderColor: '#4CAF50',
//         tension: 0.4
//       }
//     ]
//   };

//   const revenueData = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [
//       {
//         label: 'Online Sales',
//         data: [15, 18, 10, 15, 12, 15, 18],
//         backgroundColor: '#4C6FFF'
//       },
//       {
//         label: 'Offline Sales',
//         data: [12, 10, 20, 8, 10, 12, 10],
//         backgroundColor: '#4CAF50'
//       }
//     ]
//   };

//   const satisfactionData = {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
//     datasets: [
//       {
//         label: 'Last Month',
//         data: [65, 75, 70, 68, 72, 68, 75, 70],
//         borderColor: '#4C6FFF',
//         tension: 0.4
//       },
//       {
//         label: 'This Month',
//         data: [70, 78, 75, 80, 78, 75, 82, 85],
//         borderColor: '#4CAF50',
//         tension: 0.4
//       }
//     ]
//   };

//   return (
//     <div className="dashboard-content">
//       {/* Header Section */}
//       <div className="dashboard-header">
//         <h2>Today's Sales</h2>
//         {/* <button className="export-btn">
//           <FontAwesomeIcon icon={faDownload} />
//           Export
//         </button> */}
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         {statsData.map((stat, index) => (
//           <StatCard
//             key={index}
//             title={stat.title}
//             value={stat.value}
//             trend={stat.trend}
//             icon={stat.icon}
//             color={stat.color}
//           />
//         ))}
//       </div>

//       {/* Charts Section */}
      
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave, 
  faClock,
  faFileInvoiceDollar,
  faUserCheck
} from '@fortawesome/free-solid-svg-icons';
import StatCard from '../components/cards/StatCard';
import RevenueChart from '../components/Charts/RevenueChart';
import { apiServices } from '../../api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    activeContracts: 0,
    collectionRate: 0
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Récupération des données en parallèle
        const [contratsRes, paiementsRes] = await Promise.all([
          apiServices.contrats.list(),
          apiServices.paiements.list()
        ]);

        const contrats = contratsRes.data;
        const paiements = paiementsRes.data;

        // Calcul des statistiques principales
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // 1. Revenu total (somme de tous les paiements)
        const totalRevenue = paiements.reduce((sum, p) => sum + p.montant, 0);

        // 2. Paiements en retard (contrats actifs sans paiement ce mois-ci)
        const activeContracts = contrats.filter(c => {
          const dateFin = new Date(c.date_fin);
          return dateFin >= currentDate;
        }).length;

        // 3. Taux de recouvrement (paiements ce mois / montant attendu)
        const expectedRevenue = contrats.reduce((sum, c) => {
          const dateDebut = new Date(c.date_debut);
          const dateFin = new Date(c.date_fin);
          return (dateDebut <= currentDate && dateFin >= currentDate) ? sum + c.montant : sum;
        }, 0);

        const monthlyPayments = paiements
          .filter(p => {
            const paymentDate = new Date(p.date_paiement);
            return paymentDate.getMonth() === currentMonth && 
                   paymentDate.getFullYear() === currentYear;
          })
          .reduce((sum, p) => sum + p.montant, 0);

        const collectionRate = expectedRevenue > 0 
          ? Math.round((monthlyPayments / expectedRevenue) * 100) 
          : 0;

        // 4. Préparation des données mensuelles pour le graphique
        const monthlyRevenue = Array(12).fill(0);
        paiements.forEach(p => {
          const paymentDate = new Date(p.date_paiement);
          if (paymentDate.getFullYear() === currentYear) {
            const month = paymentDate.getMonth();
            monthlyRevenue[month] += p.montant;
          }
        });

        setStats({
          totalRevenue,
          pendingPayments: expectedRevenue - monthlyPayments,
          activeContracts,
          collectionRate
        });

        setMonthlyData(monthlyRevenue);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Erreur lors du chargement du tableau de bord");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MRU',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tableau de Bord</h1>
      
      {/* Cartes de Statistiques */}
      <div className="stats-grid">
        <StatCard
          icon={faMoneyBillWave}
          title="Revenu Total"
          value={formatCurrency(stats.totalRevenue)}
          trend={`${stats.collectionRate}% taux de recouvrement`}
          color="green"
        />
        
        <StatCard
          icon={faClock}
          title="Paiements en Retard"
          value={formatCurrency(stats.pendingPayments)}
          trend={`${stats.activeContracts} contrats actifs`}
          color="orange"
        />
        
        <StatCard
          icon={faFileInvoiceDollar}
          title="Contrats Actifs"
          value={stats.activeContracts}
          trend="Ce mois-ci"
          color="blue"
        />
        
        <StatCard
          icon={faUserCheck}
          title="Taux de Recouvrement"
          value={`${stats.collectionRate}%`}
          trend="Performance mensuelle"
          color="purple"
        />
      </div>

      {/* Graphique des Revenus */}
      <div className="chart-container">
        <RevenueChart 
          title="Revenus Mensuels"
          data={{
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
              label: 'Revenus',
              data: monthlyData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              tension: 0.4
            }]
          }} 
        />
      </div>
    </div>
  );
};

export default Dashboard;