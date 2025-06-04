import { useState, useEffect } from "react";
import GhKhGraph from "../../components/dashboard/GhKhGraph";
import ActivityLog from "../../components/dashboard/ActivityLog";
import AquariumList from "../../components/dashboard/AquariumList";
import HistoryTable from "../../components/dashboard/HistoryTable";

// Dati fittizi
const dummyTanks = [
  {
    id: "tank1",
    name: "Amazon River",
    type: "Freshwater",
    volume: 200,
    dimensions: { h: 50, l: 100, d: 40 },
  },
  {
    id: "tank2",
    name: "Coral Reef",
    type: "Saltwater",
    volume: 150,
    dimensions: { h: 45, l: 90, d: 35 },
  },
];

const dummyHistory = {
  tank1: [
    { date: "2024-05-01", gh: 7, kh: 6 },
    { date: "2024-05-10", gh: 8, kh: 6 },
    { date: "2024-05-15", gh: 7, kh: 7 },
  ],
  tank2: [
    { date: "2024-05-02", gh: 10, kh: 8 },
    { date: "2024-05-12", gh: 9, kh: 8 },
  ],
};

const dummyActivities = [
  { date: "2024-05-01", action: "Added new fish to Amazon River" },
  { date: "2024-05-02", action: "Water change in Coral Reef" },
  { date: "2024-05-10", action: "Tested GH/KH levels in Amazon River" },
];

const DashboardHome = () => {
  const tanks = dummyTanks;
  const history = dummyHistory;
  const [selectedTank, setSelectedTank] = useState(tanks[0]?.id || null);
  const [darkMode, setDarkMode] = useState(false);

  // Rilevamento dinamico del tema
  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(matchDark.matches);

    const listener = (e) => setDarkMode(e.matches);
    matchDark.addEventListener("change", listener);

    return () => matchDark.removeEventListener("change", listener);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        </div>

        {/* Lista Acquari */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transition-colors duration-300">
          <AquariumList
            tanks={tanks}
            selectedTank={selectedTank}
            setSelectedTank={setSelectedTank}
          />
        </div>

        {/* Tabella Storico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transition-colors duration-300">
          <HistoryTable history={history} selectedTank={selectedTank} />
        </div>

        {/* Grafico + Registro Attività */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex-1 transition-colors duration-300">
            <GhKhGraph
              tanks={tanks}
              history={history}
              selectedTank={selectedTank}
              setSelectedTank={setSelectedTank}
              darkMode={darkMode}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex-1 transition-colors duration-300">
            <ActivityLog activities={dummyActivities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;





