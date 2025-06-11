import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/shared/CustomButton";
import CustomModal from "../../components/dashboard/CustomModal";
import { toast } from "react-toastify";
import { setAllTanks } from "../../store/slices/tanksSlice";
import { addNewLight, deleteOneLight, setAllLights, setCurrentLight } from "../../store/slices/lightsSlice";
import { Link } from "react-router-dom";

const Lights = () => {
    const dispatch = useDispatch();
    const { get, post, put, del } = useApi();
    const { all: tanks } = useSelector((state) => state.tanks);
    const { all: lights } = useSelector((state) => state.lights);
    
    
    const [form, setForm] = useState({
        _id: "",
        name: "",
        description: "",
        lumen: 0,
        tank: "",
    });

    const [isOpen, setIsOpen] = useState(false);
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const [requestInfo, setRequestInfo] = useState({
        hasNextPage: false,
        hasPrevPage: false
    });

    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    
    const clearForm = () => {
        setForm({
            _id: "",
            name: "",
            description: "",
            lumen: 0,
            tank: "",
        });
        setIsEditing(false);
    }

    const handleChange = ({ target: { value, name } }) => {
        setForm((f) => ({ ...f, [name]: name == "lumen" ? Number(value) : value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                
                console.log('PUT URL:', `/lights/${form._id}`);
                console.log('PUT Data:', {
                    name: form.name,
                    description: form.description,
                    lumen: form.lumen,
                    tank: form.tank
                });
                console.log('Form completo:', form);
                
                
                const updateData = {
                    name: form.name?.trim(),
                    description: form.description?.trim(),
                    lumen: Number(form.lumen),
                    tank: form.tank
                };
                
                console.log('Update data clean:', updateData);
                
                await put(`/lights/${form._id}`, updateData);
                toast.success("Light updated successfully!", {
                    theme: "dark",
                });
            } else {
                
                const data = await post("/lights", { 
                    name: form.name,
                    description: form.description,
                    lumen: form.lumen,
                    tank: form.tank
                });
                toast.success("Light created successfully!", {
                    theme: "dark",
                });
            }
            setIsOpen(false);
            clearForm();
            fetchLights();
        } catch (error) {
            console.error('Submit error:', error);
            console.error('Error response:', error.response?.data);
            toast.error("Internal server error, try again later", {
                theme: "dark",
            });
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure to delete this light?")) return;

        try {
            await del(`/lights/${id}`);
            dispatch(deleteOneLight(id));
            toast.success("Light deleted successfully!", {
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later", {
                theme: "dark",
            });
        }
    }

    
    const handleEdit = (light) => {
        setForm({
            _id: light._id,
            name: light.name,
            description: light.description,
            lumen: light.lumen,
            tank: light.tank._id, 
        });
        setIsEditing(true);
        setIsOpen(true);
        dispatch(setCurrentLight(light._id));
    }

    const fetchLights = async () => {
        try {
            const data = await get(`/lights?limit=${limit}&page=${page}${filter == "All" ? "" : `&status=${filter}`}`);
            dispatch(setAllLights(data.docs));
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later", {
                theme: "dark",
            });
        }
    };

    const fetchTanks = async () => {
        try {
            const data = await get(`/tanks?limit=0`);
            dispatch(setAllTanks(data));
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later", {
                theme: "dark",
            });
        }
    }

    useEffect(() => {
        fetchTanks();
        fetchLights();
    }, [limit, page, filter]);

    return (
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
                        <div className="flex flex-wrap sm:flex-no-wrap gap-2">

                        </div>
                        <div>
                            <CustomButton onClick={() => setIsOpen(true)}>Add Light</CustomButton>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
                        <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <th className="p-2">Id</th>
                                <th className="p-2">Tank</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Lumen</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lights.map((light, i) => (
                                <tr key={`${light._id}-${i}`} className="border-b border-neutral-200 dark:border-neutral-700">
                                    <td className="p-3 font-medium">{light._id}</td>
                                    <td className="p-3">{light.tank.name}</td>
                                    <td className="p-3">{light.name}</td>
                                    <td className="p-3">{light.lumen}</td>
                                    <td className="p-3">{light.description}</td>
                                    <td className="p-3">
                                        <div>
                                            
                                            <i onClick={() => handleEdit(light)} className="fa-solid fa-pen-to-square cursor-pointer mr-3"></i>
                                            <i onClick={() => handleDelete(light._id)} className="fa fa-trash cursor-pointer"></i>
                                        </div>
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

            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
               
                <h2 className="text-2xl font-semibold mb-4">
                    {isEditing ? "Edit light" : "Add new light"}
                </h2>

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
                            placeholder="Es. Anubias barteri"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Lumen</label>
                        <input
                            type="number"
                            name="lumen"
                            value={form.lumen}
                            onInput={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="30000"
                            min={1}
                            step={1}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onInput={handleChange}
                            rows={8}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Es. Led, white Led, dull Led"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tank</label>
                        <select
                            type="text"
                            name="tank"
                            value={form.tank}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                            placeholder="Es. Anubias barteri"
                        >
                            <option value="">Select a Tank...</option>
                            {
                                tanks?.map(tank => (
                                    <option key={tank._id} value={tank._id}>{tank.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <CustomButton type="submit">
                        {isEditing ? "Update" : "Submit"}
                    </CustomButton>
                </form>
            </CustomModal>
        </>
    );
}

export default Lights;