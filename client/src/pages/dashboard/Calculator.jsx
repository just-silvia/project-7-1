import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/shared/CustomButton";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneCalculation, setAllCalculations, setCurrentCalculation } from "../../store/slices/calculationsSlice";

const Calculator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { get, del } = useApi();
    const { all: calculations } = useSelector((state) => state.calculations);

    const [isOpen, setIsOpen] = useState(false);
    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const [requestInfo, setRequestInfo] = useState({
        hasNextPage: false,
        hasPrevPage: false
    });

    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = async (id) => {
        if (!confirm("Are you sure to delete this calculation?")) return;

        try {
            await del(`/calculators/${id}`);
            dispatch(deleteOneCalculation(id));
            // Toast di successo per la cancellazione
            toast.success("Calculation deleted successfully!", { 
                theme: "dark" 
            });
        } catch (error) {
            console.log(error);
            toast.error("Error during deletion, try again!", {
                theme: "dark", // Rimosso il "!" che causava errore
            });
        }
    }

    const handleCurrent = (id) => {
        dispatch(setCurrentCalculation(id));
        navigate(`/app/calculator/edit?id=${id}`);
    }

    const fetchCalculations = async () => {
        try {
            const data = await get(`/calculators?limit=${limit}&page=${page}`);
            dispatch(setAllCalculations(data.docs));
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Error loading calculations, try again later!", {
                theme: "dark", // Rimosso il "!" che causava errore
            });
        }
    };

    useEffect(() => {
        fetchCalculations();
    }, [limit, page]);

    return (
        <>
            <div className="w-full flex items-start justify-center px-2 dark:bg-gray-900 dark:text-white">
                <div className="w-full max-w-7xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <h2 className="text-xl font-semibold">Calculator</h2>
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
                        </div>
                        <div>
                            <Link to="/app/calculator/new">
                                <CustomButton>New Calculation</CustomButton>
                            </Link>
                        </div>
                    </div>

                    <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
                        <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                            <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                <th className="p-2">Id</th>
                                <th className="p-2 hidden lg:table-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculations && calculations.map((calculation, i) => (
                                <tr key={`${calculation._id}-${i}`} className="border-b border-neutral-200 dark:border-neutral-700">
                                    <td className="p-3 font-medium">{calculation._id}</td>
                                    <td className="p-3 hidden md:table-cell">{calculation.name}</td>
                                    <td className="p-3 flex gap-2">
                                        <i onClick={() => handleCurrent(calculation._id)} className="fa fa-arrow-up-right-from-square cursor-pointer"></i>
                                        <i onClick={() => handleDelete(calculation._id)} className="fa fa-trash cursor-pointer"></i>
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
        </>
    );
}

export default Calculator;