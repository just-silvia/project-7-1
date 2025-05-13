export default function TanksTable({ tanks }) {
  return (
    <div className="bg-white">
      <h2 className="text-xl mb-4">I miei acquari</h2>
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Volume (L)</th>
          </tr>
        </thead>
        <tbody>
          {tanks.map((tank, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="p-2">{tank.name}</td>
              <td className="p-2">{tank.type}</td>
              <td className="p-2">{tank.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

