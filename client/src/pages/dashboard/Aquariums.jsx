import { useState, useEffect } from "react";
import CustomButton from "../../components/shared/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { deleteOneTank, setAllTanks } from "../../store/slices/tanksSlice";
import CustomModal from "../../components/dashboard/CustomModal";
import { toast } from "react-toastify";

const Aquariums = () => {
    const dispatch = useDispatch();
    const { get, post, put, del } = useApi();
    const { all: tanks } = useSelector((state) => state.tanks);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter] = useState("All");
    const [isOpen, setIsOpen] = useState(false);
    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const [requestInfo, setRequestInfo] = useState({
        hasNextPage: false,
        hasPrevPage: false,
    });

    // Struttura che corrisponde al backend
    const [form, setForm] = useState({
        _id: "",
        name: "",
        type: "TROPICAL", 
        volume: 0,        
        height: 0,        
        length: 0,        
        depth: 0          
    });

    const [isEditing, setIsEditing] = useState(false);

    const clearForm = () => {
        setForm({
            _id: "",
            name: "",
            type: "TROPICAL",
            volume: 0,
            height: 0,
            length: 0,
            depth: 0
        });
        setIsEditing(false);
    }

    const handleEditClick = (id) => {
        const item = tanks.find((el) => el._id === id);
        if (item) {
            setForm({
                _id: item._id || "",
                name: item.name || "",
                type: item.type || "TROPICAL",
                volume: item.volume || 0,
                height: item.dimensions?.h || 0,
                length: item.dimensions?.l || 0,
                depth: item.dimensions?.d || 0
            });
            setIsEditing(true);
            setIsOpen(true);
        }
    }

    const handleChange = ({ target: { value, name } }) => {
        const processedValue = 
            name === "volume" || name === "height" || name === "length" || name === "depth" 
                ? Number(value) || 0 
                : value;
        
        setForm((f) => ({ ...f, [name]: processedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tankData = {
                name: form.name,
                type: form.type,
                volume: Number(form.volume),
                dimensions: {
                    h: Number(form.height),
                    l: Number(form.length),
                    d: Number(form.depth)
                }
            };

            console.log('Form original:', form);
            console.log('Tank data to send:', tankData);
            console.log('Types:', {
                name: typeof tankData.name,
                type: typeof tankData.type,
                volume: typeof tankData.volume,
                h: typeof tankData.dimensions.h,
                l: typeof tankData.dimensions.l,
                d: typeof tankData.dimensions.d
            });

            if (isEditing) {
                console.log('PUT URL:', `/tanks/${form._id}`);
                console.log('PUT Data:', tankData);
                
                await put(`/tanks/${form._id}`, tankData);
                toast.success("Tank updated successfully!", {
                    theme: "dark",
                });
            } else {
                console.log('Creating tank with data:', tankData);
                
                const data = await post("/tanks", tankData);
                toast.success("Tank created successfully!", {
                    theme: "dark",
                });
            }
            setIsOpen(false);
            clearForm();
            fetchTanks();
        } catch (error) {
            console.error('Full error:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            toast.error("Error during operation, try again!", {
                theme: "dark",
            });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure to delete this Tank?")) return;
        try {
            await del(`/tanks/${id}`);
            dispatch(deleteOneTank(id));
            toast.success("Tank deleted successfully!", {
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error("Error during deletion, try again!", {
                theme: "dark",
            });
        }
    };

    const fetchTanks = async () => {
        try {
            const data = await get(`/tanks?limit=${limit}&page=${page}${filter == "All" ? "" : `&status=${filter}`}`);
            const tanksArray = Array.isArray(data.docs) ? data.docs : data;
            dispatch(setAllTanks(tanksArray));
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Error loading tanks, try again!", {
                theme: "dark",
            });
        }
    };

    useEffect(() => {
        fetchTanks();
    }, [limit, page, filter]);

    return (
        <>
            <div className="w-full flex items-start justify-center px-2 dark:bg-gray-900 dark:text-white">
                <div className="w-full max-w-7xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <h2 className="text-xl font-semibold">Tanks</h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setPage(1);
                                }}
                                className="border border-neutral-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            />
                            <CustomButton>Search</CustomButton>
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 justify-between">
                        <div className="flex flex-wrap sm:flex-no-wrap gap-2">

                        </div>
                        <div>
                            <CustomButton onClick={() => setIsOpen(true)}>Add Tank</CustomButton>
                        </div>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
                            <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                    <th className="p-2">Id</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Volume</th>
                                    <th className="p-2">Height</th>
                                    <th className="p-2">Length</th>
                                    <th className="p-2">Depth</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tanks.map((tank, i) => (
                                    <tr key={`${tank._id}-${i}`} className="border-b border-neutral-200 dark:border-neutral-700">
                                        <td className="p-3">{tank._id}</td>
                                        <td className="p-3">{tank.name}</td>
                                        <td className="p-3">{tank.type}</td>
                                        <td className="p-3">{tank.volume}</td>
                                        <td className="p-3">{tank.dimensions?.h}</td>
                                        <td className="p-3">{tank.dimensions?.l}</td>
                                        <td className="p-3">{tank.dimensions?.d}</td>
                                        <td className="p-3">
                                            <i onClick={() => handleEditClick(tank._id)} className="fa-regular fa-pen-to-square cursor-pointer mr-3"></i>
                                            <i onClick={() => handleDelete(tank._id)} className="fa fa-trash cursor-pointer"></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} className="dark:bg-gray-900 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">
                    {isEditing ? "Edit Tank" : "Add Tank"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            placeholder="Example: Main Tank"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                        >
                            <option value="TROPICAL">Tropical</option>
                            <option value="FRESH">Fresh Water</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Volume (Litres)</label>
                        <input
                            type="number"
                            name="volume"
                            value={form.volume}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            placeholder="Example: 20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={form.height}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            placeholder="Example: 30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Length (cm)</label>
                        <input
                            type="number"
                            name="length"
                            value={form.length}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            placeholder="Example: 50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Depth (cm)</label>
                        <input
                            type="number"
                            name="depth"
                            value={form.depth}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-neutral-600"
                            placeholder="Example: 30"
                        />
                    </div>

                    <CustomButton type="submit">
                        {isEditing ? "Update" : "Submit"}
                    </CustomButton>
                </form>
            </CustomModal>
        </>
    );
};

export default Aquariums;