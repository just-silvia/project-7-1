function ActivityLog() {
  const activities = [
    { date: '2025-03-05', action: 'Cambio acqua 20% - Tropical Paradise' },
    { date: '2025-03-03', action: 'Misurazione parametri - Amazon Basin' },
    { date: '2025-03-01', action: 'Pulizia filtro - Tropical Paradise' },
  ];

  return (
    <div className="w-full bg-white">
      <h2 className="text-xl mb-4">Registro attività</h2>
      {activities.length === 0 ? (
        <p>Nessuna attività registrata.</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((item, index) => (
            <li key={index} className="bg-gray-50 rounded-lg p-3 shadow-sm">
              <p>{item.date}</p>
              <p>{item.action}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivityLog;

