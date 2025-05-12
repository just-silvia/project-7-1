import React, { useState } from "react";
import CustomButton from "../../components/shared/CustomButton";

const requests = [ //simulazione in attesa dei dati da API
    { id: 1, name: "Silvia", status: "Pending" },
    { id: 2, name: "Manuel", status: "Completed" },
    { id: 3, name: "Sara", status: "Canceled" },
    { id: 4, name: "Alessia", status: "Pending" },
    { id: 5, name: "Alessandro", status: "Pending" },
    { id: 6, name: "Giulia", status: "Completed" },
    { id: 7, name: "Luca", status: "Pending" },
    { id: 8, name: "Francesco", status: "Canceled" },
    { id: 9, name: "Marta", status: "Completed" },
    { id: 10, name: "Elena", status: "Pending" },
    { id: 11, name: "Paolo", status: "Completed" },
    { id: 12, name: "Claudia", status: "Canceled" },
    { id: 13, name: "Giorgio", status: "Pending" },
    { id: 14, name: "Simona", status: "Completed" },
    { id: 15, name: "Davide", status: "Pending" },
    { id: 16, name: "Irene", status: "Canceled" },
    { id: 17, name: "Emanuele", status: "Completed" },
    { id: 18, name: "Martina", status: "Pending" },
    { id: 19, name: "Chiara", status: "Completed" },
    { id: 20, name: "Andrea", status: "Canceled" },
    { id: 21, name: "Stefano", status: "Pending" },
    { id: 22, name: "Federica", status: "Completed" },
    { id: 23, name: "Roberto", status: "Canceled" },
    { id: 24, name: "Lucia", status: "Pending" },
    { id: 25, name: "Marco", status: "Completed" },
    { id: 26, name: "Valeria", status: "Pending" },
    { id: 27, name: "Enrico", status: "Canceled" },
    { id: 28, name: "Serena", status: "Completed" },
    { id: 29, name: "Matteo", status: "Pending" },
    { id: 30, name: "Barbara", status: "Canceled" },
];

const RequestsStatus = ({ status }) => { //stato richieste
    const statusColor =
        status === "Completed"
            ? "bg-green-200 !text-green-600"
            : status === "Pending"
                ? "bg-amber-200 !text-amber-600"
                : status === "Canceled"
                    ? "bg-red-200 !text-red-600"
                    : "bg-gray-200 !text-gray-800";
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {status}
        </span>
    );
};



const Consultancy = () => {
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredRequests = requests
        .filter((r) => filter === "All" || r.status === filter)
        .filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };



    return (
        <div className="w-full min-h-screen bg-light flex items-center justify-center">
            <div className="w-full max-w-7xl px-4">
                <div className="flex flex-wrap items-center justify-between mb-4">
                    <h2 className="mb-4">Consultancy Requests</h2>
                    <div className="justify-between mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-neutral-300 rounded-md px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <CustomButton>Search</CustomButton>
                    </div>
                </div>

                <div className="flex flex-wrap m-1">
                    {["All", "Pending", "Completed", "Canceled"].map((st) => (
                        <button
                            key={st}
                            onClick={() => {
                                setFilter(st);
                                setCurrentPage(1);
                            }}
                            className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm border border-neutral-200 shadow-md
                                ${filter === st ? "bg-black text-white" : "bg-light"
                                }`}
                        >
                            {st}
                        </button>
                    ))}
                </div>

                <table className="w-full text-left border-spacing-y-3 overflow-hidden">
                    <thead className="text-xs uppercase border-y border-neutral-200">
                        <tr>
                            <th className="p-2">User</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRequests.map((r) => (
                            <tr key={r.id} className="border-b border-neutral-200">
                                <td className="p-3 flex items-center gap-3">
                                    <span className="font-medium">{r.name}</span>
                                </td>
                                <td className="p-3">
                                    <RequestsStatus status={r.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-600">
                    <div>
                        {filteredRequests.length > 0 ? (
                            <>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length}</>
                        ) : (
                            <>No results found</>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <CustomButton
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="px-3 py-1"
                        >Previous</CustomButton>
                        <CustomButton 
                            onClick={handleNext}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3 py-1"
                        >Next</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consultancy;