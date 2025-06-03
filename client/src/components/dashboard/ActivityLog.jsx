const ActivityLog = ({ activities = [] }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl text-center transition-colors duration-300">
        <h2 className="text-xl mb-4 font-semibold">Activity Log</h2>
        <p className="dark:text-white">No recent activities.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl transition-colors duration-300">
      <h2 className="text-xl mb-4 font-semibold dark:text-white">Activity Log</h2>
      <ul className="list-disc pl-5 space-y-2 dark:text-white">
        {activities.map((act, i) => (
          <li key={i}>
            <span className="font-medium">{act.date}:</span> {act.action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;




