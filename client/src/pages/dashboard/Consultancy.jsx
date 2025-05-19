import React, { useState } from "react";
import CustomButton from "../../components/shared/CustomButton";

const initialRequests = [ // simulazione in attesa dati da API
    { id: "1", requestType: "Consulenza per litraggio", date: "11/05", status: "Pending" },
    { id: "2", requestType: "Consulenza per litraggio", date: "11/05", status: "Completed" },
    { id: "3", requestType: "Consulenza per litraggio", date: "11/05", status: "Canceled" },
];

const RequestsStatus = ({ status }) => {
    const statusColor =
        status === "Completed"
            ? "bg-green-200 !text-green-600 dark:bg-green-400 dark:!text-green-800"
            : status === "Pending"
                ? "bg-amber-200 !text-amber-600 dark:bg-amber-400 dark:!text-amber-800"
                : status === "Canceled"
                    ? "bg-red-200 !text-red-600 dark:bg-red-400 dark:!text-red-800"
                    : "bg-gray-200 !text-gray-800 dark:bg-gray-400 dark:!text-gray-800";
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {status}
        </span>
    );
};

const Consultancy = () => {
    const [requests, setRequests] = useState(initialRequests);
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Nuovi stati per il form di aggiunta richiesta
    const [newId, setNewId] = useState("");
    const [newRequestType, setNewRequestType] = useState("");
    const [newDate, setNewDate] = useState("");

    // Filtro richieste
    const filteredRequests = requests
        .filter((r) => filter === "All" || r.status === filter)
        .filter((r) => r.id.toLowerCase().includes(searchTerm.toLowerCase()));

    // Paginazione
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    // Gestione pagine
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Funzione per aggiungere nuova richiesta
    const handleAddRequest = () => {
        if (!newId.trim() || !newRequestType.trim() || !newDate.trim()) {
            alert("Please fill all fields");
            return;
        }
        const newRequest = {
            id: newId.trim(),
            requestType: newRequestType.trim(),
            date: newDate.trim(),
            status: "Pending",
        };
        setRequests([newRequest, ...requests]);
        setNewId("");
        setNewRequestType("");
        setNewDate("");
        setCurrentPage(1);
    };

    return (
        <>
            <div className="w-full min-h-screen bg-light flex items-center justify-center px-2 dark:bg-gray-900 dark:text-white">
                <div className="w-full max-w-7xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <h2 className="text-xl font-semibold">Consultancy Requests</h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-neutral-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            />
                            <CustomButton>Search</CustomButton>
                        </div>
                    </div>
                    <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Id"
                            value={newId}
                            onChange={(e) => setNewId(e.target.value)}
                            className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-sm w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                        />
                        <input
                            type="text"
                            placeholder="Request Type"
                            value={newRequestType}
                            onChange={(e) => setNewRequestType(e.target.value)}
                            className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-sm w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                        />
                        <input
                            type="text"
                            placeholder="Date (dd/mm)"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-sm w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                        />
                        <CustomButton onClick={handleAddRequest}>Add Request</CustomButton>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                        {["All", "Pending", "Completed", "Canceled"].map((st) => (
                            <button
                                key={st}
                                onClick={() => {
                                    setFilter(st);
                                    setCurrentPage(1);
                                }}
                                className={`whitespace-nowrap px-4 py-1 rounded-full text-sm border border-neutral-200 shadow-md dark:bg-gray-800 dark:text-white dark:border-neutral-600
                            ${filter === st ? "bg-black text-white dark:text-light" : "bg-light dark:bg-neutral-950"}`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>

                    <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
                        <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <th className="p-2">Id</th>
                                <th className="p-2 hidden md:table-cell">Request Type</th>
                                <th className="p-2 hidden lg:table-cell">Date</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.map((r, i) => (
                                <tr key={`${r.id}-${i}`} className="border-b border-neutral-200 dark:border-neutral-700">
                                    <td className="p-3 font-medium">{r.id}</td>
                                    <td className="p-3 hidden md:table-cell">{r.requestType}</td>
                                    <td className="p-3 hidden lg:table-cell">{r.date}</td>
                                    <td className="p-3">
                                        <RequestsStatus status={r.status} />
                                    </td>
                                </tr>
                            ))}
                            {Array.from({ length: itemsPerPage - paginatedRequests.length }).map((_, i) => (
                                <tr key={`empty-${i}`} className="border-b border-neutral-200 opacity-0 dark:border-neutral-700">
                                    <td className="p-3">.</td>
                                    <td className="p-3 hidden md:table-cell">.</td>
                                    <td className="p-3 hidden lg:table-cell">.</td>
                                    <td className="p-3">.</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2 text-sm text-gray-600">
                        <div className="text-center sm:text-left">
                            {filteredRequests.length > 0 ? (
                                <>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length}</>
                            ) : (
                                <>No results found</>
                            )}
                        </div>
                        <div className="flex justify-center sm:justify-end gap-2">
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
        </>
    );
}

export default Consultancy;