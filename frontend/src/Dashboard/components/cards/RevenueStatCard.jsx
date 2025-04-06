// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faMoneyBillWave,
//   faChartLine,
//   faCalendarAlt,
//   faPercent
// } from '@fortawesome/free-solid-svg-icons';
// import StatCard from './StatCard';

// const RevenueStatCard = ({ data }) => {
//   const cards = [
//     {
//       title: "Revenu Total",
//       value: `${data.revenueTotal.toLocaleString()} MRU`,
//       trend: `${data.evolutionTotal}% ce mois`,
//       icon: faMoneyBillWave,
//       color: "green"
//     },
//     {
//       title: "Revenu Mensuel",
//       value: `${data.revenueMensuel.toLocaleString()} MRU`,
//       trend: `${data.evolutionMensuel}% vs dernier mois`,
//       icon: faChartLine,
//       color: "pink"
//     },
//     {
//       title: "Taux de Recouvrement",
//       value: `${data.tauxRecouvrement}%`,
//       trend: `${data.evolutionTaux}% ce mois`,
//       icon: faPercent,
//       color: "purple"
//     },
//     {
//       title: "Paiements du Mois",
//       value: data.nombrePaiements,
//       trend: `${data.evolutionNombre}% vs moyenne`,
//       icon: faCalendarAlt,
//       color: "orange"
//     }
//   ];

//   return (
//     <div className="revenue-stats-grid">
//       {cards.map((card, index) => (
//         <StatCard
//           key={index}
//           title={card.title}
//           value={card.value}
//           trend={card.trend}
//           icon={card.icon}
//           color={card.color}
//         />
//       ))}
//     </div>
//   );
// };

// export default RevenueStatCard; 
const RevenueStatCard = ({ 
  title, 
  value, 
  secondaryValue, 
  comparisonValue, 
  comparisonLabel, 
  variation = 0
}) => {
  const variationClass = 
    variation > 0 ? 'variation-positive' : 
    variation < 0 ? 'variation-negative' : '';
  
  const variationText = variation !== 0 
    ? `${Math.abs(Math.round(variation))}% ${variation > 0 ? '↑' : '↓'}` 
    : '';

  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">{value}</div>
      
      {secondaryValue && (
        <div className="stat-secondary-value">{secondaryValue}</div>
      )}
      
      {(comparisonValue || variationText) && (
        <div className="stat-comparison">
          {comparisonLabel && <span>{comparisonLabel}: {comparisonValue}</span>}
          {variationText && (
            <span className={variationClass} style={{marginLeft: '8px'}}>
              {variationText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RevenueStatCard;