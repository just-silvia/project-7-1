const AquariumList = ({ tanks = [], selectedTank, setSelectedTank }) => {
  const handleSelect = (id) => {
    if (setSelectedTank) setSelectedTank(id);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl transition-colors duration-300">
      <h2 className="text-xl mb-4">Aquarium List</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tanks.map((tank) => (
          <div
            key={tank.id}
            onClick={() => handleSelect(tank.id)}
            className={`cursor-pointer bg-white dark:bg-gray-700 shadow-md rounded-2xl p-4 border ${
              selectedTank === tank.id
                ? "border-blue-500 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-600"
            } transition-colors duration-300`}
          >
            <h3 className="text-xl mb-2">{tank.name}</h3>
            <p>
              <span className="font-medium">Type:</span> {tank.type}
            </p>
            <p>
              <span className="font-medium">Volume:</span> {tank.volume}L
            </p>
            <p>
              <span className="font-medium">Dimensions:</span> {tank?.dimensions?.h}h x {tank?.dimensions?.l}l x{" "}
              {tank?.dimensions?.d}d
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AquariumList;












