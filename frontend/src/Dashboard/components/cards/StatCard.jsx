import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './StatCard.css';

const StatCard = ({ title, value, trend, icon, color }) => {
  const isPositive = trend.includes('+');

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
          <FontAwesomeIcon icon={isPositive ? faArrowUp : faArrowDown} />
          <span className={`trend-text ${color}`}>{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
