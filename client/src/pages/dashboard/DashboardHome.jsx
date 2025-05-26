import { useState } from 'react';
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

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300`}>
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl mb-6">Dashboard</h1>
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
