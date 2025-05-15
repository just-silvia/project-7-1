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

  useEffect(() => {
    const fetchData = async () => {
      try {
        
      } catch (err) {
        console.error('Errore nel caricamento dei dati', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-light min-h-screen py-8">
      <div className="max-w-[1240px] mx-auto px-4">
        <h1 className="text-3xl mb-6">Dashboard</h1>

        {/* Miei Acquari */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <TanksTable tanks={tanks} />
        </div>

        {/* Lista Acquari */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <AquariumList />
        </div>

        {/* Tabella Storico */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <HistoryTable />
        </div>

        {/* Grafico + Registro Attività */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white rounded-2xl shadow p-4 flex-1">
            <GhKhGraph
              tanks={tanks}
              history={history}
              selectedTank={selectedTank}
              setSelectedTank={setSelectedTank}
            />
          </div>
          <div className="bg-white rounded-2xl shadow p-4 flex-1">
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
