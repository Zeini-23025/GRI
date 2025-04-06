import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHourglassHalf,
  faExclamationTriangle,
  faCheckCircle,
  faBan
} from '@fortawesome/free-solid-svg-icons';
import StatCard from './StatCard';

const TransactionStatCard = ({ data }) => {
  const cards = [
    {
      title: "En Attente",
      value: data.enAttente,
      trend: `${data.evolutionAttente}% des transactions`,
      icon: faHourglassHalf,
      color: "orange"
    },
    {
      title: "En Retard",
      value: data.enRetard,
      trend: `${data.evolutionRetard}% des transactions`,
      icon: faExclamationTriangle,
      color: "red"
    },
    {
      title: "Confirmés",
      value: data.confirmes,
      trend: `${data.evolutionConfirmes}% des transactions`,
      icon: faCheckCircle,
      color: "green"
    },
    {
      title: "Annulés",
      value: data.annules,
      trend: `${data.evolutionAnnules}% des transactions`,
      icon: faBan,
      color: "gray"
    }
  ];

  return (
    <div className="transaction-stats-grid">
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

export default TransactionStatCard; 