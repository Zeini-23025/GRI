// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
// import './StatCard.css';

// const StatCard = ({ title, value, trend, icon, color }) => {
//   const isPositive = trend.includes('%');

//   return (
//     <div className={`stat-card ${color}`}>
//       <div className="stat-icon">
//         <FontAwesomeIcon icon={icon} />
//       </div>
//       <div className="stat-content">
//         <h3>{title}</h3>
//         <div className="stat-value">{value}</div>
//         <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
//           <FontAwesomeIcon icon={isPositive ? faArrowUp : faArrowDown} />
//           <span className={`trend-text ${color}`}>{trend}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatCard;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatCard = ({ icon, title, value, trend, color }) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className={`stat-card ${colorClasses[color]}`}>
      <div className="stat-header">
        <FontAwesomeIcon icon={icon} className="stat-icon" />
        <h3 className="stat-title">{title}</h3>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-trend">{trend}</div>
    </div>
  );
};

export default StatCard;