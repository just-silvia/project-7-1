import { useSelector } from 'react-redux';

const TanksTable = () => {
  const tanks = useSelector(state => state.tanks.list);

  if (!tanks || tanks.length === 0) return <p>No tanks available</p>;

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-2xl shadow p-4 transition-colors duration-300">
      <h2 className="text-xl mb-4">My aquariums</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-2 text-left border-b border-gray-200 dark:border-gray-700">Name</th>
            <th className="p-2 text-left border-b border-gray-200 dark:border-gray-700">Type</th>
            <th className="p-2 text-left border-b border-gray-200 dark:border-gray-700">Volume (L)</th>
          </tr>
        </thead>
        <tbody>
          {tanks.map((tank) => (
            <tr key={tank.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="p-2">{tank.name}</td>
              <td className="p-2">{tank.type}</td>
              <td className="p-2">{tank.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanksTable;


