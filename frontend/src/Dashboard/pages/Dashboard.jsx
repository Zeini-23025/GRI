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



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHotel,
  faStar,
  faSearch,
  faMapMarkerAlt,
  faCalendarAlt,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  // Données pour les hôtels
  const hotelsData = [
    {
      name: "Shikara Hotel",
      location: "Alamah, Yogyatama",
      price: "$42.72 / night",
      popular: true
    },
    {
      name: "Lepsen Hotel",
      location: "Yogyatama",
      price: "$38 / night",
      popular: false
    },
    {
      name: "Shop Hotel",
      location: "Big House, Shikara",
      price: "$45 / night",
      popular: false
    }
  ];

  return (
    <div className="hotel-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Find hotel to stay</h1>
      </div>

      {/* Search Filters */}
      <div className="search-filters">
        <div className="filter-item">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>2022 - 24:14</span>
        </div>
        <div className="filter-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Yogyatama, Ind...</span>
        </div>
        <div className="filter-item">
          <FontAwesomeIcon icon={faSearch} />
          <span>View All</span>
        </div>
      </div>

      {/* Categories */}
      <div className="categories">
        <div className="category active">Lodging available</div>
        <div className="category">Most Popular</div>
        <div className="category">Where to</div>
      </div>

      {/* Popular Section */}
      <div className="popular-section">
        <h3>Most Popular</h3>
        <div className="popular-tags">
          <span className="tag">Special Offers</span>
          <span className="tag">New Me</span>
        </div>
      </div>

      {/* Hotels List */}
      <div className="hotels-list">
        {hotelsData.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <div className="location">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{hotel.location}</span>
              </div>
              <div className="price">
                <FontAwesomeIcon icon={faMoneyBillWave} />
                <span>{hotel.price}</span>
              </div>
            </div>
            {hotel.popular && (
              <div className="popular-badge">
                <FontAwesomeIcon icon={faStar} />
                <span>Popular</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hotel Details */}
      <div className="hotel-details">
        <h2>Shikara Hotel</h2>
        <div className="detail-tabs">
          <div className="tab active">Overview</div>
          <div className="tab">Facilities</div>
          <div className="tab">Details</div>
          <div className="tab">Reviews</div>
        </div>
        <div className="description">
          Shikara Hotel is committed to waste our guests' dreams. We achieve this by making business travel easier and leisure travel more accessible. Read more.
        </div>
        <div className="location-actions">
          <button className="action-btn">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Location</span>
          </button>
          <button className="action-btn">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;