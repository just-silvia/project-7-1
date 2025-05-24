import { useSelector } from 'react-redux';

const HistoryTable = () => {
  const history = useSelector(state => state.history.data);
  const selectedTank = useSelector(state => state.selectedTank);

  if (!selectedTank || !history[selectedTank]) {
    return <p className="dark:text-white">No activity available</p>;
  }

  const records = history[selectedTank];

  return (
    <div className="space-y-8 dark:text-white transition-colors duration-300">
      <h2 className="text-xl mb-4">History: {selectedTank}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">GH</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">KH</th>
            </tr>
          </thead>
          <tbody>
            {records.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{entry.date}</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{entry.gh}</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{entry.kh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;


