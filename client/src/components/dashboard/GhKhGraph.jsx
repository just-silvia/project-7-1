import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function GhKhGraph({ tanks, history, selectedTank, setSelectedTank, darkMode}) {
  const tankHistory = history[selectedTank] || [];

  const data = {
    labels: tankHistory.map(e => e.date),
    datasets: [
      {
        label: 'GH',
        data: tankHistory.map(e => e.gh),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'KH',
        data: tankHistory.map(e => e.kh),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#333' : '#f9f9f9',
        titleColor: darkMode ? '#fff' : '#000',
        bodyColor: darkMode ? '#ddd' : '#000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#ccc' : '#000',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? '#ccc' : '#000',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  return (
    <div className="w-full dark:text-white transition-colors duration-300">
      <h2 className="text-xl  mb-4">Storico GH/KH</h2>
      <select
        className="mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded p-2 w-full md:w-auto transition-colors duration-300"
        value={selectedTank}
        onChange={(e) => setSelectedTank(e.target.value)}
      >
        {tanks.map((tank) => (
          <option key={tank.name} value={tank.name}>
            {tank.name}
          </option>
        ))}
      </select>
      <div className="h-[300px] md:h-[400px] bg-white dark:bg-gray-800 rounded-2xl p-4 transition-colors duration-300">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
