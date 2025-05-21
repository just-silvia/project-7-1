import { useEffect, useState } from 'react';

function ActivityLog() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulazione fetch, da rimuovere se hai già dati reali
    setActivities([
      { date: '2025-05-15', action: 'Cambio acqua 20%' },
      { date: '2025-05-14', action: 'Controllo GH/KH' },
    ]);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl transition-colors duration-300 p-4">
      <h2 className="text-xl mb-4 font-semibold">Activity log</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No activity recorded</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((item, index) => (
            <li
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-sm transition-colors duration-300"
            >
              <p className="font-medium">{item.date}</p>
              <p>{item.action}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivityLog;


