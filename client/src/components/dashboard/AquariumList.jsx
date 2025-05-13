{/*Dati acquari*/}
const tanks = [
  {
    user: "60a6c3b4e1b4d83f3c8a4b71",
    name: "Tank 1",
    type: "TROPICAL",
    volume: 120,
    dimensions: { h: 50, l: 80, d: 30 },
    plants: [],
    lights: []
  },
  {
    user: "60a6c3b4e1b4d83f3c8a4b71",
    name: "Tank 2",
    type: "FRESH",
    volume: 200,
    dimensions: { h: 60, l: 100, d: 40 },
    plants: [],
    lights: []
  },
];

const AquariumList = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto bg-white">
      <h2 className="text-xl mb-4">Aquarium List</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tanks.map((tank, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
          >
            <h3 className="text-xl mb-2">
              {tank.name}
            </h3>
            <p>
              <span className="font-medium">Type:</span> {tank.type}
            </p>
            <p>
              <span className="font-medium">Volume:</span> {tank.volume}L
            </p>
            <p>
              <span className="font-medium">Dimensions:</span>{" "}
              {tank?.dimensions?.h}h x {tank?.dimensions?.l}l x {tank?.dimensions?.d}d
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AquariumList;



