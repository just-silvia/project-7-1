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

    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = async (id) => {
        if (!confirm("Are you sure to delete this light?")) return;

        try {
            await del(`/calculators/${id}`);
            dispatch(deleteOneCalculation(id));
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later");
        }
    }

    const handleCurrent = (id) => {
        dispatch(setCurrentCalculation(id));
        navigate(`/app/calculator/edit?id=${id}`);
    }

    const fetchCalculations = async () => {
        try {
            const data = await get(`/calculators?limit=${limit}&page=${page}${filter == "All" ? "" : `&status=${filter}`}`);
            dispatch(setAllCalculations(data.docs));
            setRequestInfo({ hasNextPage: data.hasNextPage, hasPrevPage: data.hasPrevPage });
        } catch (error) {
            console.log(error);
            toast.error("Internal server error, try again later");
        }
    };

    useEffect(() => {
        fetchCalculations();
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
                            {calculations.map((calculation, i) => (
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