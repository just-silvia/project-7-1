import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch } from "react-redux";


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function GhKhGraph({ tanks, history, selectedTank, setSelectedTank, darkMode }) {
  const dispatch = useDispatch();
  const tankHistory = history[selectedTank] || [];

  const data = {
    labels: tankHistory.map((e) => e.date),
    datasets: [
      {
        label: "GH",
        data: tankHistory.map((e) => e.gh),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: false,
      },
      {
        label: "KH",
        data: tankHistory.map((e) => e.kh),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "#eeeeee" : "#4281a4ff",
          font: { weight: "bold", size: 14 },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#2f3846" : "#f0f4f8",
        titleColor: darkMode ? "#ffffff" : "#4281a4ff",
        bodyColor: darkMode ? "#d1d9e6" : "#2a3a4e",
        borderColor: darkMode ? "#556080" : "#a9bfd9",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#b0bacd" : "#4b698d",
          font: { weight: "bold", size: 12 },
        },
        grid: { color: darkMode ? "#3a475e" : "#dbe6f0" },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#b0bacd" : "#4281a4ff",
          font: { weight: "bold", size: 12 },
        },
        grid: { color: darkMode ? "#3a475e" : "#dbe6f0" },
      },
    },
  };

  const handleChange = (e) => {
    const selectedId = e.target.value;
   //usiamo il dispatch per integrare redux
    if (setSelectedTank) {
      setSelectedTank(selectedId);
    } else {
      dispatch(setSelectedTank(selectedId));
    }
  };

  return (
    <div className="w-full dark:text-white transition-colors duration-300">
      <h2 className="text-xl mb-4">GH/KH History</h2>

      <select
        className="mb-4 border border-gray-300 dark:border-gray-400 bg-white dark:bg-gray-800 text-black dark:text-white rounded p-2 w-full md:w-auto transition-colors duration-300"
        value=""
        onChange={handleChange}
      >
        {tanks.map((tank) => (
          <option key={tank.id} value={tank.id}>
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

