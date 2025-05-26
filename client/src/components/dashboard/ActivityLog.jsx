import { useDispatch, useSelector } from 'react-redux';
import { useApi } from "../../hooks/useApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ActivityLog = () => {
  const { get } = useApi();
  const dispatch = useDispatch();

  // Prendo activities dallo store redux
  const activities = []; // useSelector(state => state.activitiesState.activities);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await get("/activities");
      } catch (error) {
        toast.error("Errore nel caricamento delle attività");
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, []);

  if (!activities || activities.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl text-center transition-colors duration-300">
        <h2 className="text-xl mb-4 font-semibold">Activity Log</h2>
        <p className="text-gray-500 dark:text-gray-400">No activity available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl transition-colors duration-300">
      <h2 className="text-xl mb-4 font-semibold">Activity Log</h2>
      <ul className="space-y-3 max-h-96 overflow-y-auto">
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




