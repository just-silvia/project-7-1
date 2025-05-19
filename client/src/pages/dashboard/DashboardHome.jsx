import { useEffect, useState } from 'react';
import TanksTable from '../../components/dashboard/TanksTable';
import GhKhGraph from '../../components/dashboard/GhKhGraph';
import ActivityLog from '../../components/dashboard/ActivityLog';
import AquariumList from '../../components/dashboard/AquariumList';
import HistoryTable from '../../components/dashboard/HistoryTable';

{/*Dati degli acquari*/}

const DashboardHome = () => {
  const [tanks, setTanks] = useState([]);
  const [history, setHistory] = useState({});
  const [selectedTank, setSelectedTank] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

   useEffect(() => {
    const fetchData = async () => {
      try {
        // Qui inserisci il codice per caricare i dati di tanks e history
      } catch (err) {
        console.error('Errore nel caricamento dei dati', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-light text-black'} min-h-screen py-8 transition-colors duration-300`}>
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl mb-6">Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {darkMode ? (
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Miei Acquari */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transintion-colors duration-300">
          <TanksTable tanks={tanks} />
        </div>

        {/* Lista Acquari */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transition-colors duration-300">
          <AquariumList />
        </div>

        {/* Tabella Storico */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 transition-colors duration-300">
          <HistoryTable />
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
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
