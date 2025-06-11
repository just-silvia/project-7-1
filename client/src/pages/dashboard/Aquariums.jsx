import { useState, useEffect } from "react";
import CustomButton from "../../components/shared/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { deleteOneTank, setAllTanks } from "../../store/slices/tanksSlice";
import CustomModal from "../../components/dashboard/CustomModal";
import { toast } from "react-toastify";
const Aquariums = () => {
    const dispatch = useDispatch();
    const { get, post, del } = useApi();
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

    const [form, setForm] = useState({
        name: "",
        type: "",
        volume: "",
        h: "",
        l: "",
        w: ""

    })

    const clearForm = () => {
        setForm({
            name: "",
            type: "",
            volume: "",
            h: "",
            l: "",
            w: ""

        });
    }
    const handleEditClick = (id) => {
        const item = tanks.find ((el) => el._id ===id);
        if (item) {
            setForm({tanks_type : item.tanks_type});
            setIsOpen(true);
        }
    } 
    const handleChange = ({ target: { value, name } }) => {
        setForm((f) => ({ ...f, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await post("/tanks", { ...form });
            setIsOpen(false);
            clearForm();
            fetchTanks();
        } catch (error) {
            console.log(error);
            toast.error("Error during registration, try again!", {
                theme: "dark",
            });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure to delete this Tank?")) return;
        try {
            await del(`/tanks/${id}`);
            dispatch(deleteOneTank(id));
        } catch (error) {
            console.log(error);
            toast.error("Error during registration, try again!", {
                theme: "dark",
            });
        }
    };
    const fetchTanks = async () => {
        try {
            const data = await get(`/tanks?limit=${limit}&page=${page}&${filter == "All" ? "" : `&status=${filter}`}`);
            const tanksArray = Array.isArray(data.docs) ? data.docs : data;
            dispatch(setAllTanks(tanksArray));
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Error during registration, try again!", {
                theme: "dark",
            });
        }
    };
    // Assicurarsi che la pagina corrente sia valida

    useEffect(() => {
        fetchTanks();
    }, [limit, page, filter]);
    return (
        <>
            <div className="w-full flex items-start justify-center sm:flex-row sm:items-center sm:justify-between px-2 dark:bg-gray-900 dark:text-white">
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
                                    setPage(1);;
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
                    <div className="overflow-x-auto w-full sm:flex-row sm:items-center sm:justify-between">
                        <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
                            <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                                <tr className="border-b border-neutral-200 dark:border-neutral-700 ">
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Id </th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Name</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Type</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Volume</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Height</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Length</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Width</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between">Actions</th>
                                    <th className="p-2 sm:flex-row sm:items-center sm:justify-between"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tanks.map((tank, i) => (
                                    <tr key={`${tank._id}-${i}`} className="border-b border-neutral-200 dark:border-neutral-700">
                                        <td className="p-3">{tank._id}</td>
                                        <td className="p-3">{tank.name}</td>
                                        <td className="p-3">{tank.type}</td>
                                        <td className="p-3" placeholder="20 l">{tank.volume}</td>
                                        <td className="p-3" placeholder="Example: 30cm">{tank.height}</td>
                                        <td className="p-3" placeholder="Example: 30cm">{tank.lenght}</td>
                                        <td className="p-3" placeholder="Example: 30cm">{tank.width}</td>
                                        <td className="p-3">
                                            <i onClick={() => handleEditClick(tank._id)} className="fa-solid fa-pen-to-square cursor-pointer mr-3"></i>
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
                <h2 className="text-2xl font-semibold mb-4">Add Tank</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: Anubias barteri"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={form.type}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: plants"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Volume</label>
                        <input
                            type="text"
                            name="volume"
                            value={form.volume}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: 20 litres"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Height</label>
                        <input
                            type="text"
                            name="height"
                            value={form.height}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: 30 cm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Length</label>
                        <input
                            type="text"
                            name="length"
                            value={form.length}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: 30 cm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Width</label>
                        <input
                            type="text"
                            name="width"
                            value={form.width}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Example: 30 cm"
                        />
                    </div>


                    <CustomButton type="submit" onClick={handleSubmit}>Submit</CustomButton>
                </form>
            </CustomModal>
        </>
    );
};

export default Aquariums;