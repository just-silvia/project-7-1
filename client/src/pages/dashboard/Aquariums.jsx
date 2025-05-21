import { useState, useEffect } from "react";
import CustomButton from "../../components/shared/CustomButton";
import CustomModal from "../../components/dashboard/CustomModal";



// Componente per lo stato degli acquari
const TanksStatus = ({ children }) => {
    const statusColor =
        children === "Last save"
            ? "bg-accent !text-white"
            : children === "First save"
                ? "bg-accent !text-white"
                : children === "Canceled"
                    ? "bg-accent !text-white"
                    : children === "Edit"
                        ? "bg-accent !text-white"
                        : children === "Delete"
                            ? "bg-accent !text-white"
                            : "bg-gray-200 !text-gray-800";

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {children}
        </span>
    );
};

const Aquariums = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        applicantName: "",
        trademarkName: "",
        description: "",
        category: "",
        submissionDate: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const isValid = Object.values(form).every((field) => field.trim() !== "");
        if (!isValid) {
            alert("Per favore compila tutti i campi.");
            return;
        }

        // Qui andrebbe la chiamata API o la logica per salvare la richiesta
        console.log("Nuova richiesta marchio:", form);

        setSubmitted(true);
        setForm({
            applicantName: "",
            trademarkName: "",
            description: "",
            category: "",
            submissionDate: "",
        });
    };
    // Stato iniziale degli acquari - simulazione in attesa dei dati da API
    const [tanks/*, setTanks*/] = useState([
       { id: 1, tank: "Tropical Aquarium", status: "Last save" },
        { id: 2, tank: "Marine Reef", status: "First save" },
        { id: 3, tank: "Planted Tank", status: "Canceled" },
    ]);
    /*const [form, setForm] = useState({
        tank_name: "",
        
    });*/
    const [elementi ,setElementi] =useState([]);
    const [nuovoNome,setNuovoNome] = useState("");
    const aggiungiElemento = () => {
        if(nuovoNome.trim()==="")return;
        setElementi ([...elementi,{id:Date.now(),nome: nuovoNome}]);
        setNuovoNome("");
    } 
    const modificaElemento = (id) => {const nuovoNome = prompt("add new tank:");
        if (nuovoNome ){
            setElementi(prev=>prev.map(el=>el.id===id?{...el,nome:nuovoNome}:el));
        }
    }
    const eliminaElemento = (id) => {setElementi(prev=>prev.filter(el=>el.id!==id));}
    /*const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };
    useEffect(() => {
        if (error && form.password === form.confirmPassword) {
            setError(false);
        }
    }, [form.password, form.confirmPassword]);*/
/*
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error) {
            setError(false)
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }*/
     //const [tank, setTank] = useState({
       //     request_type: "",
       // });
        
     //   const [isOpen, setIsOpen] = useState(false);
      //  const { get, post, del } = useApi();
    //const dispatch = useDispatch();
    //const { all: tank} = useSelector(state => state.aquariums);
    //const { user } = useSelector(state => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("All");
   
   

    const itemsPerPage = 5;

    // Funzione per aggiungere un nuovo acquario
  /* const handleSubmit = async (e) => {
           e.preventDefault();
   
           try {
               const data = await post("/tanks", { ...tank });
               dispatch(addNewTank(data));
               setIsOpen(false);
               
           } catch (error) {
               console.log(error);
               toast.error("Internal server error, try again later");
           }
       }
       const handleChange = ({ target: { value, id } }) => {
        setTanks((f) => ({ ...f, [id]: value }));
    }
    const handleDelete = async (tank_id) => {
            if (!confirm("Are you sure to delete this tank request?")) return;
            
            try {
                await del(`/consultancies/${tank_id}`);
                dispatch(deleteOnetank(tank_id));
            } catch (error) {
                console.log(error);
                toast.error("Internal server error, try again later");
            }
        }
   */


    // Filtraggio e paginazione
    const filteredTanks = tanks
        .filter((r) => filter === "All" || r.status === filter)
        .filter((r) => r.tank.toLowerCase().includes(searchTerm.toLowerCase()));

    const pageCount = Math.ceil(filteredTanks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    //const paginatedTanks = filteredTanks.slice(startIndex, startIndex + itemsPerPage);
    

    // Assicurarsi che la pagina corrente sia valida
    useEffect(() => {
        if (currentPage > pageCount && pageCount > 0) {
            setCurrentPage(pageCount);
        }
    }, [filteredTanks.length, currentPage, pageCount]);

    return (
        <>
            <h1>My Tanks</h1>
            <div className="bg-light max-w-7xl dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 border-b dark:border-gray-700 flex flex-col md:flex-row items-center justify-between px-4 m-container py-4">
                <h2>All Tanks</h2>
        </div>
                <div className="flex items-center space-x-2 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                   
                   
                </div>
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
            

            <div className="bg-light max-w-7xl dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 border-b dark:border-gray-700 flex flex-wrap items-center justify-between px-4 m-container py-4">
                <div className="flex flex-wrap gap-2 mb-4 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    <h3 className="w-full mb-2">Filter by Status:</h3>
                    {["All", "Last save", "First save", "Canceled", "Edit", "Delete"].map((st) => (
                        <button
                            key={st}
                            onClick={() => {
                                setFilter(st);
                                setCurrentPage(1);
                                
                            }}
                            className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm border border-neutral-200 shadow-md
                            ${filter === st ? "bg-black text-white" : "bg-light"}`}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            <div className="m-container dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                <table className="w-full text-left border-spacing-y-3 overflow-hidden dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    <thead className="text-xs uppercase border-y border-neutral-200 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                        <tr >
                            <th >Name Tank</th>
                            <th >Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {elementi.map((el) => (
                                <tr key={el.id} className="border-b border-neutral-200 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                    <td className="p-3 flex items-center gap-3 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                        {el.nome}
                                    </td>
                                    <td className="p-3 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                                       
                                    </td>
                                    
                                </tr>
                            ))}
                        
                        
                    </tbody>
                </table>
            </div>

            <footer className="m-container py-4 bg-light dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 text-dark dark:text-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                    <div>
                        {filteredTanks.length > 0 ? (
                            <>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTanks.length)} of {filteredTanks.length}</>
                        ) : (
                            <>No results found</>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 mt-4 md:mt-0 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                        <CustomButton
                            type="default"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </CustomButton>
                        
                        <span className="px-2 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                            Page {currentPage} of {Math.max(1, pageCount)}
                        </span>
                        
                        <CustomButton
                            type="default"
                            onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                            disabled={currentPage >= pageCount}
                        >
                            Next
                        </CustomButton>
                    </div>
                </div>
            </footer>
            
                    <CustomButton onClick={aggiungiElemento}>Add tank</CustomButton>
                    <input
                            type="text"
                            name="first_name"
                            placeholder="Add Tank"
                            value={nuovoNome}
                            onChange={(e)=>setNuovoNome(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                         <CustomButton className="bg-yellow-400 px-2 py-1 rounded" onClick={()=>modificaElemento()}>Edit tank</CustomButton>
                                        <CustomButton className="bg-yellow-400 px-2 py-1 rounded" onClick={()=>eliminaElemento()}>Delete tank</CustomButton>
                 <div>
                <CustomButton onClick={() => setIsOpen(io => !io)}>
                    New Tank
                </CustomButton>
            </div>
             <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <h2 className="text-2xl font-semibold mb-4">New tank</h2>

                {submitted && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        wELLDONE!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name tank</label>
                        <input
                            type="text"
                            name="applicantName"
                            value={form.applicantName}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Details</label>
                        <input
                            type="text"
                            name="trademarkName"
                            value={form.trademarkName}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Calculator details</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Date add</label>
                        <input
                            type="date"
                            name="submissionDate"
                            value={form.submissionDate}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <CustomButton type="submit">HAVING YOUR NEW TANK!</CustomButton>
                </form>
            </CustomModal>

                  
                        
                 
        </>
    );
};

export default Aquariums;