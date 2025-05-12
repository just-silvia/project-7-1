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

export default function GhKhGraph({ tanks, history, selectedTank, setSelectedTank }) {
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
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <h2 className="text-xl  mb-4">Storico GH/KH</h2>
      <select
        className="mb-4 border border-gray-300 rounded p-2 w-full md:w-auto"
        value={selectedTank}
        onChange={(e) => setSelectedTank(e.target.value)}
      >
        {tanks.map((tank) => (
          <option key={tank.name} value={tank.name}>
            {tank.name}
          </option>
        ))}
      </select>
      <div className="h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
