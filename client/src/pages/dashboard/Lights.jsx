import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
/* import { useDispatch, useSelector } from "react-redux";
import { createLight, deleteLightById } from "../../../../server/api/controllers/lights"; */
import CustomButton from "../../components/shared/CustomButton";
import CustomModal from "../../components/dashboard/CustomModal";
import { toast } from "react-toastify";

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
}


const Lights = () => {
    const [requests, setRequests] = useState([]);
    const [light, setLight] = useState({ name: "Led" }); //finta luce
    const { get, post, del } = useApi();
    /* const dispatch = useDispatch();
    const { all: requests } = useSelector(state => state.lights);
    const { user } = useSelector(state => state.auth);
 */
    const [form, setForm] = useState({
        request_type: "",
    });

    const [ isOpen, setIsOpen ] = useState(false);
    const [limit, setLimit] = useState(10);
        const [page, setPage] = useState(1);
        const [requestInfo, setRequestInfo] = useState({
            hasNextPage: false,
            hasPrevPage: false
    });

    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const clearForm = () => {
        setForm({
            request_type: "",
        });
    }

    const handleChange = ({ target: { value, name } }) => {
        setForm((f) => ({ ...f, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const data = await post("/lights", { ...form });
            setRequests(prev => [...prev, data]); //x aggiornare manualmente
            /* dispatch(createLight(data)); */
            setIsOpen(false);
            clearForm();
        } catch (error) {
            toast.error("Internal server error, try again later");
        }
    }

    const handleDelete = async (light_id) => {
        if (!confirm("Are you sure to delete this light?")) return;

        try {
            await del(`/lights/${light_id}`);
            setRequests(prev => prev.filter(r => r._id !== light_id)); //x rimuovere manualmente
            /* dispatch(deleteLightById(light_id)); */
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later");
        }
    }

    const fetchLights = async () => {
        try {
            const data = await get(`/lights?limit=${limit}&${page}${filter == "All" ? "" : `&status=${filter}`}`);
            setRequests(data.docs);
            /* dispatch(setAllLights(data.docs)); */
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later");
        }
    }

    useEffect(() => {
        fetchLights();
    }, [limit, page, filter]);

    return(
        <>
            <div className="w-full flex items-start justify-center px-2 dark:bg-gray-900 dark:text-white">
                <div className="w-full max-w-7xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <h2 className="text-xl font-semibold">Lights</h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setPage(1);;
                                }}
                                className="border border-neutral-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            />
                            <CustomButton>Search</CustomButton>
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 justify-between">
                        <div className="flex flex-wrap sm:flex-nowrap gap-2">
                            {["All", "Pending", "Completed", "Canceled"].map((st) => (
                                <button
                                    key={st}
                                    onClick={() => {
                                        setFilter(st);
                                        setPage(1);
                                    }}
                                    className={`whitespace-nowrap px-4 py-1 rounded-full text-sm border border-neutral-200 shadow-md dark:bg-gray-800 dark:text-white dark:border-neutral-600 cursor-pointer
                                ${filter === st ? "bg-black text-white dark:text-light" : "bg-light dark:bg-neutral-950"}`}
                                >
                                    {st}
                                </button>
                            ))}
                        </div>
                        <div>
                            <CustomButton onClick={() => setIsOpen(true)}>Add Light</CustomButton>
                        </div>
                    </div>

                    <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
                        <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <th className="p-2">Id</th>
                                <th className="p-2 hidden md:table-cell">Light Type</th>
                                <th className="p-2 hidden lg:table-cell">Created At</th>
                                <th className="p-2 hidden lg:table-cell">Last Update</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((r, i) => (
                                <tr key={`${r.id}-${i}`} className="border-b border-neutral-200 dark:border-neutral-700">
                                    <td className="p-3 font-medium">{r._id}</td>
                                    <td className="p-3 hidden md:table-cell">{r.request_type}</td>
                                    <td className="p-3 hidden lg:table-cell">{new Date(r.createdAt).toLocaleString()}</td>
                                    <td className="p-3 hidden lg:table-cell">{new Date(r.updatedAt).toLocaleString()}</td>
                                    <td className="p-3">
                                        <RequestsStatus status={r.status} />
                                    </td>
                                    <td className="p-3">
                                        <i onClick={() => handleDelete(r._id)} className="fa fa-trash cursor-pointer"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2 text-sm text-gray-600">
                        <div className="text-center sm:text-left">

                        </div>
                        <div className="flex justify-center sm:justify-end gap-2">
                            <CustomButton
                                onClick={() => setPage(p => p - 1)}
                                disabled={!requestInfo.hasPrevPage}
                                className="px-3 py-1"
                            >Previous</CustomButton>
                            <CustomButton
                                onClick={() => setPage(p => p + 1)}
                                disabled={!requestInfo.hasNextPage}
                                className="px-3 py-1"
                            >Next</CustomButton>
                        </div>
                    </div>
                </div>
            </div>

            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <h2 className="text-2xl font-semibold mb-4">Add new light</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Your name</label>
                        <input
                            readOnly
                            type="text"
                            name="name"
                            value={light.name}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Elaborate your request</label>
                        <textarea
                            type="text"
                            name="request_type"
                            value={form.request_type}
                            onChange={handleChange}
                            required
                            rows={8}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        ></textarea>
                    </div>
                    <CustomButton type="submit">Submit</CustomButton>
                </form>
            </CustomModal>
        </>
    );
}

export default Lights;