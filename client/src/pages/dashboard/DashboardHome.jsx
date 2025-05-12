import { useState } from 'react';
import AquariumList from './src/pages/dashboard/AquariumList';
import HistoryTable from './src/pages/dashboard/HistoryTable';
import TanksTable from './src/components/shared/TanksTable';
import GhKhGraph from './src/components/GhKhGraph';
import ActivityLog from './src/components/ActivityLog';

{/*Dati degli acquari*/}
const tanks = [
  {
    user: "60a6c3b4e1b4d83f3c8a4b71",
    name: "Tropical Paradise",
    type: "TROPICAL",
    volume: 120,
    dimensions: { h: 50, l: 80, d: 30 },
    plants: [],
    lights: []
  },
  {
    user: "60a6c3b4e1b4d83f3c8a4b71",
    name: "Amazon Basin",
    type: "FRESH",
    volume: 200,
    dimensions: { h: 60, l: 100, d: 40 },
    plants: [],
    lights: []
  }
];

{/* Storico GH/KH per ciascun acquario*/}
const history = {
  "Tropical Paradise": [
    { date: '2025-01-01', gh: 7, kh: 5 },
    { date: '2025-02-01', gh: 8, kh: 6 },
    { date: '2025-03-01', gh: 6, kh: 5 }
  ],
  "Amazon Basin": [
    { date: '2025-01-01', gh: 4, kh: 3 },
    { date: '2025-02-01', gh: 5, kh: 3 },
    { date: '2025-03-01', gh: 4, kh: 2 }
  ]
};

const DashboardHome = () => {
  const [selectedTank, setSelectedTank] = useState(tanks[0]?.name || '');

  return (
    <div className="bg-light min-h-screen py-8">
      <div className="max-w-[1240px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

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
