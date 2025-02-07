import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Charts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  barThickness: 12
};

const TargetChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Target Sales',
        data: [8, 12, 15, 14, 16, 18],
        backgroundColor: '#FFD700',
        borderRadius: 6,
      },
      {
        label: 'Reality Sales',
        data: [10, 11, 13, 15, 12, 17],
        backgroundColor: '#4CAF50',
        borderRadius: 6,
      }
    ]
  };

  return (
    <div className="chart-wrapper">
      <Bar 
        options={options} 
        data={data}
      />
    </div>
  );
};

export default TargetChart; 