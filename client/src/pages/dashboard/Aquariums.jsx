import { useState, useEffect } from "react";
import CustomButton from "../../components/shared/CustomButton";

// Componente per lo stato degli acquari
const TanksStatus = ({ status }) => {
    const statusColor =
        status === "Last save"
            ? "bg-accent !text-white"
            : status === "First save"
                ? "bg-accent !text-white"
                : status === "Canceled"
                    ? "bg-accent !text-white"
                    : status === "Edit"
                        ? "bg-accent !text-white"
                        : status === "Delete"
                            ? "bg-accent !text-white"
                            : "bg-gray-200 !text-gray-800";

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {status}
        </span>
    );
};

const Aquariums = () => {
    // Stato iniziale degli acquari - simulazione in attesa dei dati da API
    const [tanks, setTanks] = useState([
        { id: 1, tank: "Tropical Aquarium", status: "Last save" },
        { id: 2, tank: "Marine Reef", status: "First save" },
        { id: 3, tank: "Planted Tank", status: "Canceled" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("All");
    const [newTankName, setNewTankName] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const itemsPerPage = 5;

    // Funzione per aggiungere un nuovo acquario
    const addTank = () => {
        if (newTankName.trim() === "") {
            alert("Please enter a tank name");
            return;
        }

        const newTank = {
            id: tanks.length + 1,
            tank: newTankName,
            status: "First save"
        };

        setTanks([...tanks, newTank]);
        setNewTankName("");
        setShowAddForm(false);
    };

    // Filtraggio e paginazione
    const filteredTanks = tanks
        .filter((r) => filter === "All" || r.status === filter)
        .filter((r) => r.tank.toLowerCase().includes(searchTerm.toLowerCase()));

    const pageCount = Math.ceil(filteredTanks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTanks = filteredTanks.slice(startIndex, startIndex + itemsPerPage);

    // Assicurarsi che la pagina corrente sia valida
    useEffect(() => {
        if (currentPage > pageCount && pageCount > 0) {
            setCurrentPage(pageCount);
        }
    }, [filteredTanks.length, currentPage, pageCount]);

    return (
        <>
            <h1>My Tanks</h1>
            <div className="bg-light max-w-7xl dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 border-b dark:border-gray-700 flex flex-col md:flex-row items-center justify-between px-4 m-container py-4">
                <h2>All Tanks</h2>

                <div className="flex items-center space-x-2 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    {/* Pulsante Add Tank */}
                    {!showAddForm ? (
                        <CustomButton
                            type="default"
                            onClick={() => setShowAddForm(true)}
                        >
                            Add Tank
                        </CustomButton>
                    ) : (
                        <div className="flex items-center space-x-2 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                            <input
                                type="text"
                                placeholder="New Tank Name"
                                value={newTankName}
                                onChange={(e) => setNewTankName(e.target.value)}
                                className="border border-neutral-300 rounded-md px-3 py-1 text-sm shadow-sm dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <CustomButton
                                type="default"
                                onClick={addTank}
                            >
                                Save
                            </CustomButton>
                            <CustomButton
                                type="inverse"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setNewTankName("");
                                }}
                            >
                                Cancel
                            </CustomButton>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-light max-w-7xl dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 border-b dark:border-gray-700 flex flex-wrap items-center justify-between px-4 m-container py-4">
                <div className="flex flex-wrap gap-2 mb-4 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    <h3 className="w-full mb-2">Filter by Status:</h3>
                    {["All", "Last save", "First save", "Canceled", "Edit", "Delete"].map((st) => (
                        <button
                            key={st}
                            onClick={() => {
                                setFilter(st);
                                setCurrentPage(1);
                            }}
                            className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm border border-neutral-200 shadow-md
                            ${filter === st ? "bg-black text-white" : "bg-light"}`}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            <div className="m-container dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                <table className="w-full text-left border-spacing-y-3 overflow-hidden dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    <thead className="text-xs uppercase border-y border-neutral-200 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                        <tr >
                            <th >Name Tank</th>
                            <th >Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTanks.length > 0 ? (
                            paginatedTanks.map((r) => (
                                <tr key={r.id} className="border-b border-neutral-200 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                    <td className="p-3 flex items-center gap-3 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                        <span className="font-medium dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">{r.tank}</span>
                                    </td>
                                    <td className="p-3 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                        <TanksStatus status={r.status} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="p-3 text-center dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                    No tanks found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <footer className="m-container py-4 bg-light dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 text-dark dark:text-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    <div>
                        {filteredTanks.length > 0 ? (
                            <>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTanks.length)} of {filteredTanks.length}</>
                        ) : (
                            <>No results found</>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 mt-4 md:mt-0 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                        <CustomButton
                            type="default"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </CustomButton>
                        
                        <span className="px-2 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                            Page {currentPage} of {Math.max(1, pageCount)}
                        </span>
                        
                        <CustomButton
                            type="default"
                            onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                            disabled={currentPage >= pageCount}
                        >
                            Next
                        </CustomButton>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Aquariums;