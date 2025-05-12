
import { useState, useEffect } from "react"






const Aquariums = () => {

    const [value, setValue] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [counter, setCounter] = useState(0)

    const [acquari, setAcquari] = useState();
    // Stato per il nuovo acquario o quello in modifica
    const [nomeAcquario, setNomeAcquario] = useState("");
    // Stato per tenere traccia dell'acquario in modifica
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (event) => {
        console.log(event.target.value);
    }
    // Funzione per aggiungere un nuovo acquario
    // Funzione per aggiungere un nuovo acquario
    const aggiungiAcquario = () => {
        if (nomeAcquario.trim() === '') return; // Evita inserimenti vuoti
        setAcquari([...acquari, nomeAcquario]);
        setNomeAcquario('');
    };

    // Funzione per eliminare un acquario dato l'indice
    const eliminaAcquario = (index) => {
        const nuoviAcquari = [...acquari];
        if (index >= 0 && index < nuoviAcquari.length) {
            nuoviAcquari.splice(index, 1);
            setAcquari(nuoviAcquari);
        }
    };

    // Funzione per iniziare la modifica di un acquario
    const modificaAcquario = (index) => {
        if (index >= 0 && index < acquari.length) {
            setNomeAcquario(acquari[index]);
            setEditIndex(index);
        }
    };

    // Funzione per salvare la modifica dell'acquario
    const salvaModifica = () => {
        if (nomeAcquario.trim() === '' || editIndex === null) return;

        const nuoviAcquari = [...acquari];
        if (editIndex >= 0 && editIndex < nuoviAcquari.length) {
            nuoviAcquari[editIndex] = nomeAcquario;
            setAcquari(nuoviAcquari);
            setNomeAcquario('');
            setEditIndex(null);
        }
    };

    // counter collegato a pagine numero:...
    const [pages, setPages] = useState([]);
    const newPages = { id: Date.now(), name: `Page #${pages.length + 1}`  };
    setPages([...pages, newPages]);
    setCounter(prev => prev + 1);


    useEffect(() => {
        console.log("aggiornato valore");
        setValue();

    }, [value]);

    useEffect(() => {
        console.log("aggiornato acquario");

        setAcquari();

    }, [acquari]);

    useEffect(() => {
        console.log("aggiornato nome ");

        setNomeAcquario('');

    }, [nomeAcquario]);

    useEffect(() => {
        console.log("aggiornata ricerca");

        setSearchTerm('');
    }, [searchTerm]);

    return (
        <>
            <thead>
                <div className="flex flex-auto w-full md:w-auto md:w-auto ">
                    <div className="flex flex-row  w-full md:w-auto md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff] left:0">
                        <div>
                            <h1 className="flex flex-col w-full md:w-auto md:w-auto  bg-[#f5f5f5ff] text-[#1f1f1fff] ">My Tanks</h1>
                            <div className="flex flex-col ">
                                <div className="flex flex-col  w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff] ">
                                    <h1 className="flex flex-col  w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff] ">All Tanks</h1>
                                    <p>VIEW ALL</p>
                                    <input className="flex flex-col  items-center border border-gray-600 rounded px-4 py-2 w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff] left:0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} />
                                    <input className="flex flex-col border border-gray-600 rounded px-4 py-2 items-center w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff] focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" onInput={searchTerm} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff]">
                            <div className="flex flex-row">
                                <h2 className="flex flex-row   w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff]">Aquarium Management</h2>

                                <div className="bg-[#1f1f1fff] text-[white] border border-gray-600 rounded px-4 py-2">
                                    <button className="bg-[#1f1f1fff] text-[white] focus:outline-none focus:ring-2 focus:ring-blue-500" >Filter
                                        <select className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1f1f1fff] text-[white]" onChange="">
                                            <option className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1f1f1fff] text-[white]" value="one">tanks</option>
                                            <option className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1f1f1fff] text-[white]" value="two">plants</option>
                                            <option className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1f1f1fff] text-[white]" value="three">light</option>
                                        </select>
                                    </button>
                                    <input className="flex flex-row  items-center w-full md:w-auto bg-[#1f1f1fff] text-[white] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        value={nomeAcquario}
                                        onChange={(e) => setNomeAcquario(e.target.value)}
                                        placeholder="My new tank" />
                                    {editIndex !== null ? (
                                        <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1f1f1fff] text-[white]" onClick={salvaModifica}>Save Tank</button>
                                    ) : (
                                        <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#1f1f1fff] text-[white]" onClick={aggiungiAcquario}>
                                            Add Tank</button>
                                    )}

                                    <ul className="flex flex-col columns-3 items-center w-[1260] bg-[#0f192eff] text-[#4281a4ff]">
                                        {acquari.map((acquario, index) => (
                                            <li key={index}>
                                                {acquario}
                                                <button onClick={() => modificaAcquario(index)}>Edit</button>
                                                <button onClick={() => eliminaAcquario(index)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row  items-center w-full md:w-auto bg-[#f5f5f5ff] text-[#1f1f1fff]">
                        </div>
                    </div>
                </div>

            </thead>
            <tbody>
                <table className="flex  border border-solid border-[#50b99a] bg-[] text-[]">
                    <thead className="flex  border border-solid border-[#50b99a]">
                        <tr className="flex  border border-solid border-[#50b99a]">
                            <th className="flex  border border-solid border-[#50b99a]">Name Tank
                                <select className="focus:outline-none focus:ring-2 focus:ring-blue-500 flex  border border-solid border-[#50b99a]" onChange={handleChange}>
                                    <option className="focus:outline-none focus:ring-2 focus:ring-blue-500 flex  border border-solid border-[#50b99a]" value="one">tank</option>
                                    <option className="ffocus:outline-none focus:ring-2 focus:ring-blue-500 lex  border border-solid border-[#50b99a]" value="two">plants</option>
                                    <option className="focus:outline-none focus:ring-2 focus:ring-blue-500 flex  border border-solid border-[#50b99a]" value="three">lights</option>
                                </select>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="flex  border border-solid border-[#50b99a]" >
                        {Array.isArray(value) && value.map((item) =>
                            <tr key={item.NameTank}>
                                <td>{item.NameTank}</td>
                                <td>{item.Actions}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </tbody>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TANK PAGE</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map(page => (
                        <tr key={page.id}>
                            <td>{page.id}</td>
                            <td>{page.tankpage}</td>
                            <td>{page.actions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-auto items-end space-y-2">
                <span>
                    <p>Pages added:{[...pages, newPages]}</p>
                    <button className="flex flex-auto  w-full md:w-auto border-1 border-gray-500 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setCounter(counter - 1)}>previous {counter}</button>
                    <button className="flex flex-auto  w-full md:w-auto border-1 border-gray-500 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 " onClick={() => setCounter(counter + 1)}>next{counter}</button>
                    <button className="flex flex-auto  w-full md:w-auto border-1 border-gray-500 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 " onClick={() => setCounter(counter == 0)}>reset {counter}</button>
                </span>
            </div>

        </>
    )
}


export default Aquariums;
