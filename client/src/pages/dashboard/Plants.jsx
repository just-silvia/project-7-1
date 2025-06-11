import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/shared/CustomButton";
import CustomModal from "../../components/dashboard/CustomModal";
import { toast } from "react-toastify";
import {
  addNewPlant,
  deleteOnePlant,
  setAllPlants,
} from "../../store/slices/plantsSlice";
import { setAllTanks } from "../../store/slices/tanksSlice";

const Plants = () => {
  const dispatch = useDispatch();
  const { get, post, del } = useApi();
  const { all: tanks } = useSelector((state) => state.tanks);
  const { all: plants } = useSelector((state) => state.plants);

  const [form, setForm] = useState({
    name: "",
    description: "",
    tank: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [requestInfo, setRequestInfo] = useState({
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const clearForm = () => {
    setForm({
      name: "",
      description: "",
      tank: "",
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleEditClick = (plant) => {
    const item = plant.find((p) => p._id === plant.id);
    
    if (item) {
      setForm({
        name: item.name,
        description: item.description,
        tank: item.tank._id,
      });
      setIsOpen(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await post("/plants", { ...form });
      dispatch(addNewPlant(data));
      setIsOpen(false);
      clearForm();
    } catch (error) {
      toast.error("Internal server error, try again later!", {
        theme: "dark",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this plant?")) return;
    try {
      await del(`/plants/${id}`);
      dispatch(deleteOnePlant(id));
    } catch {
      console.log(error);
      toast.error("Internal server error, try again later!", {
        theme: "dark",
      });
    }
  };

  const fetchPlants = async () => {
    try {
      const data = await get(
        `/plants?limit=${limit}&page=${page}${
          filter == "All" ? "" : `&status=${filter}`
        }`
      );
      dispatch(setAllPlants(data.docs));
      setRequestInfo({
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      });
    } catch (error) {
      console.log(error);
      toast.error("Internal server error, try again later!", {
        theme: "dark",
      });
    }
  };

  const fetchTanks = async () => {
    try {
      const data = await get(`/tanks?limit=0`);
      dispatch(setAllTanks(data));
      setRequestInfo({
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      });
    } catch (error) {
      console.log(error);
      toast.error("Internal server error, try again later!", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    fetchTanks();
    fetchPlants();
  }, [limit, page, filter]);

  return (
    <>
      <div className="w-full flex items-start justify-center px-2 dark:bg-gray-900 dark:text-white">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold">Plants</h2>
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
            <div className="flex flex-wrap sm:flex-nowrap gap-2"></div>
            <div>
              <CustomButton onClick={() => setIsOpen(true)}>
                Add Plant
              </CustomButton>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
              <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="p-2">Id</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant, i) => (
                  <tr
                    key={`${plant._id}-${i}`}
                    className="border-b border-neutral-200 dark:border-neutral-700"
                  >
                    <td className="p-3 font-medium">{plant._id}</td>
                    <td className="p-3">{plant.name}</td>
                    <td className="p-3">{plant.description}</td>
                    <td className="p-3">
                      <i onClick={() => handleEditClick(plant._id)} className="fa-solid fa-pen-to-square cursor-pointer mr-3"></i>
                      <i
                        onClick={() => handleDelete(plant._id)}
                        className="fa fa-trash cursor-pointer"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2 text-sm text-gray-600">
            <div className="text-center sm:text-left"></div>
            <div className="flex justify-center sm:justify-end gap-2">
              <CustomButton
                onClick={() => setPage((p) => p - 1)}
                disabled={!requestInfo.hasPrevPage}
                className="px-3 py-1"
              >
                Previous
              </CustomButton>
              <CustomButton
                onClick={() => setPage((p) => p + 1)}
                disabled={!requestInfo.hasNextPage}
                className="px-3 py-1"
              >
                Next
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-xl font-semibold mb-4">Add new Plants</h2>
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
              placeholder="Es. Shade plant, slow growing, suitable for beginners"
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
              {tanks?.map((tank) => (
                <option key={tank._id} value={tank._id}>
                  {tank.name}
                </option>
              ))}
            </select>
          </div>
          <CustomButton type="submit">Submit</CustomButton>
        </form>
      </CustomModal>
    </>
  );
};

export default Plants;
