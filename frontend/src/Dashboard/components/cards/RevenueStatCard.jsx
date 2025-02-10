import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave,
  faChartLine,
  faCalendarAlt,
  faPercent
} from '@fortawesome/free-solid-svg-icons';
import StatCard from './StatCard';

const RevenueStatCard = ({ data }) => {
  const cards = [
    {
      title: "Revenu Total",
      value: `${data.revenueTotal.toLocaleString()} MRU`,
      trend: `${data.evolutionTotal}% ce mois`,
      icon: faMoneyBillWave,
      color: "green"
    },
    {
      title: "Revenu Mensuel",
      value: `${data.revenueMensuel.toLocaleString()} MRU`,
      trend: `${data.evolutionMensuel}% vs dernier mois`,
      icon: faChartLine,
      color: "pink"
    },
    {
      title: "Taux de Recouvrement",
      value: `${data.tauxRecouvrement}%`,
      trend: `${data.evolutionTaux}% ce mois`,
      icon: faPercent,
      color: "purple"
    },
    {
      title: "Paiements du Mois",
      value: data.nombrePaiements,
      trend: `${data.evolutionNombre}% vs moyenne`,
      icon: faCalendarAlt,
      color: "orange"
    }
  ];

  return (
    <div className="revenue-stats-grid">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          trend={card.trend}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default RevenueStatCard; 