import { useState } from 'react';
import CustomButton from '../../components/shared/CustomButton';
import { useApi } from '../../hooks/useApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setCurrentCalculation } from '../../store/slices/calculationsSlice';

const EditCalculator = () => {

    const { get, put } = useApi();
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    const { current: calculation } = useSelector(state => state.calculations);

    const fetchCalculation = async () => {
        try {
            const current = await get(`/calculators/${searchParams.get("id")}`);

            dispatch(setCurrentCalculation(current));
        } catch (error) {
            console.log(error)
            toast.error("No data available");
        }
    }
    
    const [name, setName] = useState(calculation?.name || "");

    // Stati per gestire i valori dei form
    const [totalLiters, setTotalLiters] = useState(calculation?.parameters.totalLiters || '');
    const [changedLiters, setChangedLiters] = useState(calculation?.parameters.changedLiters || '');

    // Valori attuali
    const [no3Start, setNo3Start] = useState(calculation?.parameters.current.no3 || '');
    const [po4Start, setPo4Start] = useState(calculation?.parameters.current.po4 || '');
    const [feStart, setFeStart] = useState(calculation?.parameters.current.fe || '');
    const [khStart, setKhStart] = useState(calculation?.parameters.current.kh || '');
    const [ghStart, setGhStart] = useState(calculation?.parameters.current.gh || '');

    // Valori desiderati
    const [no3, setNo3] = useState(calculation?.parameters.target.no3 || '');
    const [po4, setPo4] = useState(calculation?.parameters.target.po4 || '');
    const [fe, setFe] = useState(calculation?.parameters.target.fe || '');
    const [kh, setKh] = useState(calculation?.parameters.target.kh || '');
    const [gh, setGh] = useState(calculation?.parameters.target.gh || '');

    // Selezioni protocolli
    const [protocol, setProtocol] = useState(calculation?.parameters.protocol || 'easylife');
    const [ghSalts, setGhSalts] = useState(calculation?.parameters.ghSalts || 'masterline');
    const [khSalts, setKhSalts] = useState(calculation?.parameters.khSalts || 'drak');

    // Stato per i risultati
    const [results, setResults] = useState(calculation?.results || []);
    const [errors, setErrors] = useState([]);
    const [showResult, setShowResult] = useState(calculation?.results.length > 0 ? true : false);
    // Stato per indicare se stiamo salvando i risultati
    const [saving, setSaving] = useState(false);

    // Dosaggi corretti (specifici per i vari marchi)
    const dosages = {
        masterline: {
            no3: { dose: 1, perLiters: 30, increase: 1, unit: 'ppm' },
            po4: { dose: 1, perLiters: 30, increase: 0.5, unit: 'ppm' },
            fe: { dose: 1, perLiters: 30, increase: 0.7, unit: 'ppm' },
            gh: { dose: 3, perLiters: 15, increase: 6, unit: 'dgh' },
            kh: null,
        },
        drak: {
            no3: { dose: 1, perLiters: 50, increase: 2, unit: 'mg/l' },
            po4: { dose: 1, perLiters: 50, increase: 0.1, unit: 'mg/l' },
            fe: { dose: 5, perLiters: 50, increase: 0.1, unit: 'ppm' },
            kh: { dose: 1.5, perLiters: 50, increase: 1, unit: 'dkh' },
            gh: { dose: 1, perLiters: 30, increase: 1, unit: 'dgh' },
        },
        easylife: {
            no3: { dose: 10, perLiters: 500, increase: 2.0, unit: 'ppm' },
            po4: { dose: 10, perLiters: 500, increase: 0.1, unit: 'ppm' },
            fe: { dose: 5, perLiters: 100, increase: 0.5, unit: 'mg/l' },
            kh: null,
            gh: null,
        },
        qualdrop: {
            no3: { dose: 0.5, perLiters: 50, increase: 1, unit: 'ppm' },
            po4: { dose: 0.5, perLiters: 50, increase: 0.1, unit: 'ppm' },
            fe: { dose: 1, perLiters: 25, increase: 0.1, unit: 'ppm' },
            kh: null,
            gh: null,
        },
        amtra: {
            gh: { dose: 5, perLiters: 10, increase: 8, unit: 'dgh' },
            kh: { dose: 5, perLiters: 10, increase: 4, unit: 'dkh' },
            no3: null,
            po4: null,
            fe: null,
        },
    };

    const handleName = ({ target: { value } }) => {
        setName(value);
    }

    // Funzione per ottenere i valori
    const getValue = (value) => {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? 0 : parsedValue; // Restituisce 0 se non è un numero valido
    };

    // Funzione per calcolare il dosaggio necessario
    const calculateDosageParameter = (initialValue, targetValue, dosageInfo, totalLiters, changedLiters, currentParameter) => {
        if (!dosageInfo) return null;

        let loss = initialValue * (changedLiters / totalLiters);
        let valueToRestore = targetValue - (initialValue - loss);

        // Adattamento del calcolo in base all'unità di misura (assumendo che il target sia sempre in ppm o dGH/dKH)
        let conversionFactor = 1;
        if (dosageInfo.unit === 'mg/l' && ['no3', 'po4', 'fe'].includes(currentParameter)) {

            if (currentParameter === 'fe' && targetValue > 1) {
                conversionFactor = 1;
            } else {
                conversionFactor = 1;
            }
        }

        return (valueToRestore * totalLiters) / dosageInfo.perLiters * dosageInfo.dose / dosageInfo.increase * conversionFactor;
    };

    function calculateDosages(e) {
        e.preventDefault();
        // Ottieni i valori dal modulo e convertili in numeri
        const totalLitersValue = getValue(totalLiters);
        const changedLitersValue = getValue(changedLiters);

        // Valori iniziali di ogni parametro
        const initialValues = {
            no3: getValue(no3Start),
            po4: getValue(po4Start),
            fe: getValue(feStart),
            kh: getValue(khStart),
            gh: getValue(ghStart),
        };

        // Valori target (desiderati)
        const targetValues = {
            no3: getValue(no3),
            po4: getValue(po4),
            fe: getValue(fe),
            kh: getValue(kh),
            gh: getValue(gh),
        };

        const newResults = [];
        const newErrors = [];

        // Validazione degli input
        if (isNaN(totalLitersValue) || isNaN(changedLitersValue) || totalLitersValue <= 0) {
            newErrors.push('Error: Enter valid values for liters.');
        }

        // Calcolo per NO3
        let currentParameter = 'no3';
        let dosageNO3Info = dosages[protocol]?.no3;
        let dosageNO3 = calculateDosageParameter(initialValues.no3, targetValues.no3, dosageNO3Info, totalLitersValue, changedLitersValue, currentParameter);
        if (dosageNO3 !== null && dosageNO3 > 0) {
            newResults.push(`NO3 (${protocol}): ${dosageNO3.toFixed(2)} ml to maintain ${targetValues.no3} ppm`);
        } else if (targetValues.no3 > initialValues.no3 && !protocol) {
            newErrors.push('Error: Select a protocol for NO3.');
        }

        // Calcolo per PO4
        currentParameter = 'po4';
        let dosagePO4Info = dosages[protocol]?.po4;
        let dosagePO4 = calculateDosageParameter(initialValues.po4, targetValues.po4, dosagePO4Info, totalLitersValue, changedLitersValue, currentParameter);
        if (dosagePO4 !== null && dosagePO4 > 0) {
            newResults.push(`PO4 (${protocol}): ${dosagePO4.toFixed(2)} ml to maintain ${targetValues.po4} ppm`);
        } else if (targetValues.po4 > initialValues.po4 && !protocol) {
            newErrors.push('Error: Select a protocol for PO4.');
        }

        // Calcolo per Fe
        currentParameter = 'fe';
        let dosageFeInfo = dosages[protocol]?.fe;
        let dosageFe = calculateDosageParameter(initialValues.fe, targetValues.fe, dosageFeInfo, totalLitersValue, changedLitersValue, currentParameter);
        if (dosageFe !== null && dosageFe > 0) {
            newResults.push(`Fe (${protocol}): ${dosageFe.toFixed(2)} ml to maintain ${targetValues.fe} ppm`);
        } else if (targetValues.fe > initialValues.fe && !protocol) {
            newErrors.push('Error: Select a protocol for Fe.');
        }

        // Calcolo per KH
        currentParameter = 'kh';
        let dosageKHInfo = dosages[khSalts]?.kh;
        let dosageKH = calculateDosageParameter(initialValues.kh, targetValues.kh, dosageKHInfo, totalLitersValue, changedLitersValue, currentParameter);
        if (dosageKHInfo && dosageKH !== null && dosageKH > 0) {
            newResults.push(`KH (${khSalts}): ${dosageKH.toFixed(2)} ml/g to maintain ${targetValues.kh} °dKH`);
        } else if (targetValues.kh > initialValues.kh && !khSalts) {
            newErrors.push('Error: Select salts for KH.');
        }

        // Calcolo per GH
        currentParameter = 'gh';
        let dosageGHInfo = dosages[ghSalts]?.gh;
        let dosageGH = calculateDosageParameter(initialValues.gh, targetValues.gh, dosageGHInfo, totalLitersValue, changedLitersValue, currentParameter);
        if (dosageGHInfo && dosageGH !== null && dosageGH > 0) {
            newResults.push(`GH (${ghSalts}): ${dosageGH.toFixed(2)} ml/g to maintain ${targetValues.gh} °dGH`);
        } else if (targetValues.gh > initialValues.gh && !ghSalts) {
            newErrors.push('Error: Select salts for GH.');
        }

        // Aggiorna gli stati
        setResults(newResults);
        setErrors(newErrors);
        setShowResult(true);
    }

    // Funzione per salvare i risultati
    const saveResults = async () => {
        // Controlla se ci sono risultati da salvare
        if (results.length === 0) {
            toast.warning("No results to save!");
            return;
        }

        // Indica che stiamo salvando
        setSaving(true);

        try {
            // Prepariamo i dati da inviare
            const dataToSave = {
                // date: new Date().toISOString(),
                name,
                parameters: {
                    totalLiters: getValue(totalLiters),
                    changedLiters: getValue(changedLiters),
                    current: {
                        no3: getValue(no3Start),
                        po4: getValue(po4Start),
                        fe: getValue(feStart),
                        kh: getValue(khStart),
                        gh: getValue(ghStart),
                    },
                    target: {
                        no3: getValue(no3),
                        po4: getValue(po4),
                        fe: getValue(fe),
                        kh: getValue(kh),
                        gh: getValue(gh),
                    },
                    protocol: protocol,
                    ghSalts: ghSalts,
                    khSalts: khSalts,
                },
                results: results,
            };

            // Eseguiamo la chiamata POST
            const response = await put(`/calculators/${searchParams.get("id")}`, dataToSave, "API");
            
            // Mostriamo un messaggio di successo
            toast.success("Calculation saved successfully!");
            
        } catch (err) {
            console.error(err);
            toast.error("Error saving calculation. Please try again later.");
        } finally {
            // Indipendentemente dal risultato, indichiamo che abbiamo finito di salvare
            setSaving(false);
        }
    };

    useEffect(() => {
        if (!calculation) {
            fetchCalculation();
        } else {
            setName(calculation.name)
            setTotalLiters(calculation.parameters.totalLiters)
            setChangedLiters(calculation.parameters.changedLiters)
            setNo3Start(calculation.parameters.current.no3)
            setPo4Start(calculation.parameters.current.po4)
            setFeStart(calculation.parameters.current.fe)
            setKhStart(calculation.parameters.current.kh)
            setGhStart(calculation.parameters.current.gh)
            setNo3(calculation.parameters.target.no3)
            setPo4(calculation.parameters.target.po4)
            setFe(calculation.parameters.target.fe)
            setKh(calculation.parameters.target.kh)
            setGh(calculation.parameters.target.gh)
            setProtocol(calculation.protocol)
            setGhSalts(calculation.ghSalts)
            setKhSalts(calculation.khSalts)
            setResults(calculation.results)
        }
    }, [calculation]);

    if (!calculation) {
        return (
            <></>
        )
    }

    return (
        <form onSubmit={calculateDosages} className="w-full">
            <h1 className="text-3xl font-bold mb-6">Calculator</h1>
            
            <div className="flex flex-col gap-2 w-full lg:max-w-[91.3%] p-6 m-auto rounded-lg mb-6 shadow-md bg-white dark:bg-gray-800">
                <label htmlFor="name">Calculation name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name} 
                    onInput={handleName} 
                    placeholder="Name..." 
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                />
            </div>

            <div className="flex flex-wrap justify-center">
                {/* Calcolatore principale */}
                <div className="w-full lg:w-[60%] p-6 rounded-lg flex flex-wrap justify-between items-start mb-6 shadow-md bg-white dark:bg-gray-800">
                    <div className="calculator flex flex-col md:flex-row items-baseline gap-5 w-full">
                        {/* Sezione litri */}
                        <div className="flex-1">
                            <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Water change</h3>
                            <div className="mb-6">
                                <label htmlFor="totalLiters" className="block mb-2 text-dark dark:text-gray-200">
                                    Total Liters <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="totalLiters"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={totalLiters}
                                    onChange={(e) => setTotalLiters(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="changedLiters" className="block mb-2 text-dark dark:text-gray-200">
                                    Changed Liters <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="changedLiters"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={changedLiters}
                                    onChange={(e) => setChangedLiters(e.target.value)}
                                    required
                                />
                            </div>
                            <CustomButton type="submit">
                                Calculate Fertilization
                            </CustomButton>
                        </div>

                        {/* Sezione valori attuali */}
                        <div className="flex-1">
                            <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Current Values</h3>
                            <div className="mb-6">
                                <label htmlFor="no3Start" className="block mb-2 text-dark dark:text-gray-200">Current NO3:</label>
                                <input
                                    type="number"
                                    id="no3Start"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={no3Start}
                                    onChange={(e) => setNo3Start(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="po4Start" className="block mb-2 text-dark dark:text-gray-200">Current PO4:</label>
                                <input
                                    type="number"
                                    id="po4Start"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={po4Start}
                                    onChange={(e) => setPo4Start(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="feStart" className="block mb-2 text-dark dark:text-gray-200">Current Fe:</label>
                                <input
                                    type="number"
                                    id="feStart"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={feStart}
                                    onChange={(e) => setFeStart(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="khStart" className="block mb-2 text-dark dark:text-gray-200">Current KH:</label>
                                <input
                                    type="number"
                                    id="khStart"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={khStart}
                                    onChange={(e) => setKhStart(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="ghStart" className="block mb-2 text-dark dark:text-gray-200">Current GH:</label>
                                <input
                                    type="number"
                                    id="ghStart"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={ghStart}
                                    onChange={(e) => setGhStart(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Sezione valori desiderati */}
                        <div className="flex-1">
                            <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Desired Values</h3>
                            <div className="mb-6">
                                <label htmlFor="no3" className="block mb-2 text-dark dark:text-gray-200">Desired NO3:</label>
                                <input
                                    type="number"
                                    id="no3"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={no3}
                                    onChange={(e) => setNo3(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="po4" className="block mb-2 text-dark dark:text-gray-200">Desired PO4:</label>
                                <input
                                    type="number"
                                    id="po4"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={po4}
                                    onChange={(e) => setPo4(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="fe" className="block mb-2 text-dark dark:text-gray-200">Desired Fe:</label>
                                <input
                                    type="number"
                                    id="fe"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={fe}
                                    onChange={(e) => setFe(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="kh" className="block mb-2 text-dark dark:text-gray-200">Desired KH:</label>
                                <input
                                    type="number"
                                    id="kh"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={kh}
                                    onChange={(e) => setKh(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="gh" className="block mb-2 text-dark dark:text-gray-200">Desired GH:</label>
                                <input
                                    type="number"
                                    id="gh"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={gh}
                                    onChange={(e) => setGh(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu tendina */}
                <div className="dropdown-menu w-full lg:w-[30%] lg:ml-4 p-6 rounded-lg mb-6 shadow-md bg-white dark:bg-gray-800">
                    <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Select Protocol</h3>
                    <div className="mb-6">
                        <label htmlFor="protocol" className="block mb-2 text-dark dark:text-gray-200">Protocol:</label>
                        <select
                            id="protocol"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                            value={protocol}
                            onChange={(e) => setProtocol(e.target.value)}
                        >
                            <option value="easylife">Easy Life</option>
                            <option value="masterline">Masterline</option>
                            <option value="drak">Drak</option>
                            <option value="qualdrop">Qualdrop</option>
                        </select>
                    </div>

                    <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Select GH Salts</h3>
                    <div className="mb-6">
                        <label htmlFor="ghSalts" className="block mb-2 text-dark dark:text-gray-200">GH Salts:</label>
                        <select
                            id="ghSalts"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                            value={ghSalts}
                            onChange={(e) => setGhSalts(e.target.value)}
                        >
                            <option value="masterline">Masterline</option>
                            <option value="amtra">Amtra</option>
                            <option value="drak">Drak</option>
                        </select>
                    </div>

                    <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Select KH Salts</h3>
                    <div className="mb-6">
                        <label htmlFor="khSalts" className="block mb-2 text-dark dark:text-gray-200">KH Salts:</label>
                        <select
                            id="khSalts"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                            value={khSalts}
                            onChange={(e) => setKhSalts(e.target.value)}
                        >
                            <option value="drak">Drak</option>
                            <option value="amtra">Amtra</option>
                        </select>
                    </div>
                    
                    {/* Sezione risultati */}
                    {showResult && (
                        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                            <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Results</h3>
                            {errors.length > 0 ? (
                                <div>
                                    {errors.map((error, index) => (
                                        <p key={index} className="text-red-500 dark:text-red-400">{error}</p>
                                    ))}
                                </div>
                            ) : results.length > 0 ? (
                                <div>
                                    {results.map((result, index) => (
                                        <p key={index} className="py-1 text-dark dark:text-gray-200">{result}</p>
                                    ))}
                                    
                                    {/* Bottone per salvare i risultati */}
                                    <div className="mt-4 flex justify-end">
                                        <CustomButton
                                            type="default"
                                            onClick={saveResults}
                                            disabled={saving}
                                        >
                                            {saving ? "Saving..." : "Save"}
                                        </CustomButton>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-dark dark:text-gray-200">No dosage needed or invalid selections.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default EditCalculator;