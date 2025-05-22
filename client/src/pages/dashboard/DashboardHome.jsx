import { useState, useEffect } from 'react';
import TanksTable from '../../components/dashboard/TanksTable';
import GhKhGraph from '../../components/dashboard/GhKhGraph';
import ActivityLog from '../../components/dashboard/ActivityLog';
import AquariumList from '../../components/dashboard/AquariumList';
import HistoryTable from '../../components/dashboard/HistoryTable';

const DashboardHome = () => {
  const [tanks, setTanks] = useState([]);
  const [history, setHistory] = useState({});
  const [selectedTank, setSelectedTank] = useState('');

  useEffect(() => {
    // Simulazione fetch API: sostituisci con fetch('/api/tanks') o altro
    const fetchTanks = async () => {
      // Dati demo
      const tanksDemo = [
        { id: '1', name: 'Acquario Tropicale', type: 'Tropical', volume: 120, dimensions: { h: 50, l: 60, d: 40 } },
        { id: '2', name: 'Acquario Marino', type: 'Marine', volume: 200, dimensions: { h: 60, l: 80, d: 50 } },
        { id: '3', name: 'Acquario Dolce', type: 'Freshwater', volume: 100, dimensions: { h: 45, l: 55, d: 35 } },
      ];

      setTanks(tanksDemo);
      setSelectedTank(tanksDemo[0].id); // Seleziona il primo acquario di default
    };

    const fetchHistory = async () => {
      // Dati demo di storico (date, GH, KH)
      const historyDemo = {
        '1': [
          { date: '2025-05-10', gh: 7, kh: 5 },
          { date: '2025-05-11', gh: 7.1, kh: 5.1 },
          { date: '2025-05-12', gh: 6.9, kh: 4.8 },
        ],
        '2': [
          { date: '2025-05-10', gh: 8, kh: 6 },
          { date: '2025-05-11', gh: 7.8, kh: 6.2 },
        ],
        '3': [
          { date: '2025-05-10', gh: 5, kh: 3 },
          { date: '2025-05-11', gh: 5.2, kh: 3.1 },
          { date: '2025-05-12', gh: 4.9, kh: 3.0 },
        ],
      };

      setHistory(historyDemo);
    };

    fetchTanks();
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen py-8 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl mb-6">Dashboard</h1>
        </div>

        {/* Miei Acquari */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transition-colors duration-300">
          <TanksTable tanks={tanks} />
        </div>

        {/* Lista Acquari */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transition-colors duration-300">
          {/* Passiamo i tanks e la selezione per poter cambiare */}
          <AquariumList tanks={tanks} selectedTank={selectedTank} setSelectedTank={setSelectedTank} />
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
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex-1 transition-colors duration-300">
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

