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

const HistoryTable = () => {
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
