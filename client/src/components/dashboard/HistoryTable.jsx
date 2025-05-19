import { useEffect, useState } from "react";

const HistoryTable = () => {
  const [history, setHistory] = useState({});

  useEffect(() => {

  });

  return (
    <div className="space-y-8">
      {Object.entries(history).map(([tankName, records]) => (
        <div key={tankName}>
          <h2 className="text-xl mb-4">{tankName}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">GH</th>
                  <th className="border px-4 py-2 text-left">KH</th>
                </tr>
              </thead>
              <tbody>
                {records.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{entry.date}</td>
                    <td className="border px-4 py-2">{entry.gh}</td>
                    <td className="border px-4 py-2">{entry.kh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTable;
