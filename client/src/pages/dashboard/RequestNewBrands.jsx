import { useState, useEffect } from "react";
import CustomButton from "../../components/shared/CustomButton";
import CustomModal from "../../components/dashboard/CustomModal";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewConsultancy,
  deleteOneConsultancy,
  setAllConsultancies,
} from "../../store/slices/consultanciesSlice";

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
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
    >
      {status}
    </span>
  );
};

const RequestNewBrands = () => {
  const dispatch = useDispatch();
  const { get, post, del } = useApi();
  const { user } = useSelector((state) => state.auth);
  const { all: requests } = useSelector((state) => state.consultancies);

  const [form, setForm] = useState({
    request_type: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      request_type: "",
    });
    setSubmitted(false);
  };

  const handleChange = ({ target: { value, name } }) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await post("/brands", form);
      dispatch(addNewConsultancy(data));
      setSubmitted(true);
      clearForm();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal server error, try again later");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this new consultancy request?"))
      return;

    try {
      await del(`/brands/${id}`);
      dispatch(deleteOneConsultancy(id));
    } catch (error) {
      console.log(error);
      toast.error("Internal server error, try again later");
    }
  };

  const fetchNewConsultancies = async () => {
    try {
      const data = await get(
        `/brands?limit=${limit}&page=${page}${
          filter === "All" ? "" : `&status=${filter}`
        }`
      );
      dispatch(setAllConsultancies(data.docs));
      setRequestInfo({
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      });
    } catch (error) {
      console.log(error);
      toast.error("Internal server error, try again later");
    }
  };

  useEffect(() => {
    fetchNewConsultancies();
  }, [limit, page, filter]);

  return (
    <>
      <div className="w-full flex items-start justify-center px-2 dark:bg-gray-900 dark:text-white">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold">Request New Brands</h2>
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

          <div className="flex flex-col gap-2 overflow-x-auto pb-2 mb-4 justify-between sm:flex-row items-stretch sm:items-center">
            <div className="flex flex-wrap gap-2 sm:flex-no-wrap">
              {["All", "Pending", "Completed", "Canceled"].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setFilter(st);
                    setPage(1);
                  }}
                  className={`whitespace-nowrap px-4 py-1 rounded-full text-sm border border-neutral-200 shadow-md dark:bg-gray-800 dark:text-white dark:border-neutral-600 cursor-pointer
                    ${
                      filter === st
                        ? "bg-black text-white dark:text-light"
                        : "bg-light dark:bg-neutral-950"
                    }`}
                >
                  {st}
                </button>
              ))}
            </div>
            <div>
              <CustomButton onClick={() => setIsOpen((io) => !io)}>
                New Request
              </CustomButton>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-spacing-y-3 overflow-hidden text-sm">
              <thead className="text-xs uppercase border-y border-neutral-200 dark:border-neutral-700">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="p-2">Id</th>
                  <th className="p-2">Request Type</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Last Update</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r, i) => (
                  <tr
                    key={`${r.id}-${i}`}
                    className="border-b border-neutral-200 dark:border-neutral-700"
                  >
                    <td className="p-3 font-medium">{r._id}</td>
                    <td className="p-3">
                      {r.request_type}
                    </td>
                    <td className="p-3">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      {new Date(r.updatedAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <RequestsStatus status={r.status} />
                    </td>
                    <td className="p-3">
                      <i
                        onClick={() => handleDelete(r._id)}
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

      {/* Custom Modal da non modificare*/}
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-2xl font-semibold mb-4">New Brand Request</h2>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Request sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your name</label>
            <input
              readOnly
              type="text"
              name="name"
              value={`${user.first_name} ${user.last_name}`}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Elaborate your request
            </label>
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
};

export default RequestNewBrands;
