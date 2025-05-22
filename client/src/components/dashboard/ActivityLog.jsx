import { useSelector } from 'react-redux';

const ActivityLog = () => {
  // Seleziono solo activities dalla slice activitiesState
  const activities = useSelector(state => state.activitiesState.activities);

  if (!activities || activities.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl text-center">
        <h2 className="text-xl mb-4 font-semibold">Activity Log</h2>
        <p className="text-gray-500 dark:text-gray-400">No activity available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl transition-colors duration-300">
      <h2 className="text-xl mb-4 font-semibold">Activity Log</h2>
      <ul className="space-y-3">
        {activities.map((item, index) => (
          <li
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-sm"
          >
            <p className="font-medium">{item.date}</p>
            <p>{item.action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;



