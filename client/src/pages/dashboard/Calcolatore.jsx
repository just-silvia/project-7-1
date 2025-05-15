import React, { useState } from 'react';
import CustomButton from '../../components/shared/CustomButton';

const Calcolatore = () => {
    // Stati per gestire i valori dei form
    const [litriTotali, setLitriTotali] = useState('');
    const [litriCambiati, setLitriCambiati] = useState('');

    // Valori attuali
    const [no3Start, setNo3Start] = useState('');
    const [po4Start, setPo4Start] = useState('');
    const [feStart, setFeStart] = useState('');
    const [khStart, setKhStart] = useState('');
    const [ghStart, setGhStart] = useState('');

    // Valori desiderati
    const [no3, setNo3] = useState('');
    const [po4, setPo4] = useState('');
    const [fe, setFe] = useState('');
    const [kh, setKh] = useState('');
    const [gh, setGh] = useState('');

    // Selezioni protocolli
    const [protocollo, setProtocollo] = useState('easylife');
    const [saliGH, setSaliGH] = useState('masterline');
    const [saliKH, setSaliKH] = useState('drak');

    // Stato per i risultati
    const [risultati, setRisultati] = useState([]);
    const [errori, setErrori] = useState([]);
    const [mostraRisultato, setMostraRisultato] = useState(false);

    // Dosaggi corretti (specifici per i vari marchi)
    const dosaggi = {
        masterline: {
            no3: { dose: 1, perLitri: 30, aumento: 1, unit: 'ppm' },
            po4: { dose: 1, perLitri: 30, aumento: 0.5, unit: 'ppm' },
            fe: { dose: 1, perLitri: 30, aumento: 0.7, unit: 'ppm' },
            gh: { dose: 3, perLitri: 15, aumento: 6, unit: 'dgh' },
            kh: null,
        },
        drak: {
            no3: { dose: 1, perLitri: 50, aumento: 2, unit: 'mg/l' },
            po4: { dose: 1, perLitri: 50, aumento: 0.1, unit: 'mg/l' },
            fe: { dose: 5, perLitri: 50, aumento: 0.1, unit: 'ppm' },
            kh: { dose: 1.5, perLitri: 50, aumento: 1, unit: 'dkh' },
            gh: { dose: 1, perLitri: 30, aumento: 1, unit: 'dgh' },
        },
        easylife: {
            no3: { dose: 10, perLitri: 500, aumento: 2.0, unit: 'ppm' },
            po4: { dose: 10, perLitri: 500, aumento: 0.1, unit: 'ppm' },
            fe: { dose: 5, perLitri: 100, aumento: 0.5, unit: 'mg/l' },
            kh: null,
            gh: null,
        },
        qualdrop: {
            no3: { dose: 0.5, perLitri: 50, aumento: 1, unit: 'ppm' },
            po4: { dose: 0.5, perLitri: 50, aumento: 0.1, unit: 'ppm' },
            fe: { dose: 1, perLitri: 25, aumento: 0.1, unit: 'ppm' },
            kh: null,
            gh: null,
        },
        amtra: {
            gh: { dose: 5, perLitri: 10, aumento: 8, unit: 'dgh' },
            kh: { dose: 5, perLitri: 10, aumento: 4, unit: 'dkh' },
            no3: null,
            po4: null,
            fe: null,
        },
    };

    // Funzione per ottenere i valori
    const getValore = (valore) => {
        const parsedValue = parseFloat(valore);
        return isNaN(parsedValue) ? 0 : parsedValue; // Restituisce 0 se non è un numero valido
    };

    // Funzione per calcolare il dosaggio necessario
    const calcolaDosaggioParametro = (valoreIniziale, valoreTarget, dosaggioInfo, litriTotali, litriCambiati, parametroCorrente) => {
        if (!dosaggioInfo) return null;

        let perdita = valoreIniziale * (litriCambiati / litriTotali);
        let valoreDaRipristinare = valoreTarget - (valoreIniziale - perdita);

        // Adattamento del calcolo in base all'unità di misura (assumendo che il target sia sempre in ppm o dGH/dKH)
        let fattoreConversione = 1;
        if (dosaggioInfo.unit === 'mg/l' && ['no3', 'po4', 'fe'].includes(parametroCorrente)) {

            if (parametroCorrente === 'fe' && valoreTarget > 1) {
                fattoreConversione = 1;
            } else {
                fattoreConversione = 1;
            }
        }

        return (valoreDaRipristinare * litriTotali) / dosaggioInfo.perLitri * dosaggioInfo.dose / dosaggioInfo.aumento * fattoreConversione;
    };

    function calcolaDosaggi() {
        // Ottieni i valori dal modulo e convertili in numeri
        const litriTotaliValue = getValore(litriTotali);
        const litriCambiatiValue = getValore(litriCambiati);

        // Valori iniziali di ogni parametro
        const valoriIniziali = {
            no3: getValore(no3Start),
            po4: getValore(po4Start),
            fe: getValore(feStart),
            kh: getValore(khStart),
            gh: getValore(ghStart),
        };

        // Valori target (desiderati)
        const valoriTarget = {
            no3: getValore(no3),
            po4: getValore(po4),
            fe: getValore(fe),
            kh: getValore(kh),
            gh: getValore(gh),
        };

        const nuoviRisultati = [];
        const nuoviErrori = [];

        // Validazione degli input
        if (isNaN(litriTotaliValue) || isNaN(litriCambiatiValue) || litriTotaliValue <= 0) {
            nuoviErrori.push('Error: Enter valid values for liters.');
        }

        // Calcolo per NO3
        let parametroCorrente = 'no3';
        let dosaggioNO3Info = dosaggi[protocollo]?.no3;
        let dosaggioNO3 = calcolaDosaggioParametro(valoriIniziali.no3, valoriTarget.no3, dosaggioNO3Info, litriTotaliValue, litriCambiatiValue, parametroCorrente);
        if (dosaggioNO3 !== null && dosaggioNO3 > 0) {
            nuoviRisultati.push(`NO3 (${protocollo}): ${dosaggioNO3.toFixed(2)} ml to maintain ${valoriTarget.no3} ppm`);
        } else if (valoriTarget.no3 > valoriIniziali.no3 && !protocollo) {
            nuoviErrori.push('Error: Select a protocol for NO3.');
        }

        // Calcolo per PO4
        parametroCorrente = 'po4';
        let dosaggioPO4Info = dosaggi[protocollo]?.po4;
        let dosaggioPO4 = calcolaDosaggioParametro(valoriIniziali.po4, valoriTarget.po4, dosaggioPO4Info, litriTotaliValue, litriCambiatiValue, parametroCorrente);
        if (dosaggioPO4 !== null && dosaggioPO4 > 0) {
            nuoviRisultati.push(`PO4 (${protocollo}): ${dosaggioPO4.toFixed(2)} ml to maintain ${valoriTarget.po4} ppm`);
        } else if (valoriTarget.po4 > valoriIniziali.po4 && !protocollo) {
            nuoviErrori.push('Error: Select a protocol for PO4.');
        }

        // Calcolo per Fe
        parametroCorrente = 'fe';
        let dosaggioFeInfo = dosaggi[protocollo]?.fe;
        let dosaggioFe = calcolaDosaggioParametro(valoriIniziali.fe, valoriTarget.fe, dosaggioFeInfo, litriTotaliValue, litriCambiatiValue, parametroCorrente);
        if (dosaggioFe !== null && dosaggioFe > 0) {
            nuoviRisultati.push(`Fe (${protocollo}): ${dosaggioFe.toFixed(2)} ml to maintain ${valoriTarget.fe} ppm`);
        } else if (valoriTarget.fe > valoriIniziali.fe && !protocollo) {
            nuoviErrori.push('Error: Select a protocol for Fe.');
        }

        // Calcolo per KH
        parametroCorrente = 'kh';
        let dosaggioKHInfo = dosaggi[saliKH]?.kh;
        let dosaggioKH = calcolaDosaggioParametro(valoriIniziali.kh, valoriTarget.kh, dosaggioKHInfo, litriTotaliValue, litriCambiatiValue, parametroCorrente);
        if (dosaggioKHInfo && dosaggioKH !== null && dosaggioKH > 0) {
            nuoviRisultati.push(`KH (${saliKH}): ${dosaggioKH.toFixed(2)} ml/g to maintain ${valoriTarget.kh} °dKH`);
        } else if (valoriTarget.kh > valoriIniziali.kh && !saliKH) {
            nuoviErrori.push('Error: Select salts for KH.');
        }

        // Calcolo per GH
        parametroCorrente = 'gh';
        let dosaggioGHInfo = dosaggi[saliGH]?.gh;
        let dosaggioGH = calcolaDosaggioParametro(valoriIniziali.gh, valoriTarget.gh, dosaggioGHInfo, litriTotaliValue, litriCambiatiValue, parametroCorrente);
        if (dosaggioGHInfo && dosaggioGH !== null && dosaggioGH > 0) {
            nuoviRisultati.push(`GH (${saliGH}): ${dosaggioGH.toFixed(2)} ml/g to maintain ${valoriTarget.gh} °dGH`);
        } else if (valoriTarget.gh > valoriIniziali.gh && !saliGH) {
            nuoviErrori.push('Error: Select salts for GH.');
        }

        // Aggiorna gli stati
        setRisultati(nuoviRisultati);
        setErrori(nuoviErrori);
        setMostraRisultato(true);
    }

    return (
        <div className="w-full bg-light dark:bg-dark">
            <h1 className="text-3xl font-bold mb-6">Fertilization Calculator</h1>
            
            <div className="flex flex-wrap justify-center">
                {/* Calcolatore principale */}
                <div className="w-full lg:w-[60%] p-6 rounded-lg flex flex-wrap justify-between items-start mb-6 shadow-md bg-white dark:bg-gray-800">
                    <div className="calcolatore flex flex-col md:flex-row items-baseline gap-5 w-full">
                        {/* Sezione litri */}
                        <div className="flex-1">
                            <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Fertilization Calculator</h3>
                            <div className="mb-6">
                                <label htmlFor="litriTotali" className="block mb-2 text-dark dark:text-gray-200">
                                    Total Liters <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="litriTotali"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={litriTotali}
                                    onChange={(e) => setLitriTotali(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="litriCambiati" className="block mb-2 text-dark dark:text-gray-200">
                                    Changed Liters <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="litriCambiati"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                                    value={litriCambiati}
                                    onChange={(e) => setLitriCambiati(e.target.value)}
                                    required
                                />
                            </div>
                            <CustomButton onClick={calcolaDosaggi} type="default">
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
                <div className="menu-tendina w-full lg:w-[30%] lg:ml-4 p-6 rounded-lg mb-6 shadow-md bg-white dark:bg-gray-800">
                    <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Select Protocol</h3>
                    <div className="mb-6">
                        <label htmlFor="protocollo" className="block mb-2 text-dark dark:text-gray-200">Protocol:</label>
                        <select
                            id="protocollo"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                            value={protocollo}
                            onChange={(e) => setProtocollo(e.target.value)}
                        >
                            <option value="easylife">Easy Life</option>
                            <option value="masterline">Masterline</option>
                            <option value="drak">Drak</option>
                            <option value="qualdrop">Qualdrop</option>
                        </select>
                    </div>

                    <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Select GH Salts</h3>
                    <div className="mb-6">
                        <label htmlFor="saliGH" className="block mb-2 text-dark dark:text-gray-200">GH Salts:</label>
                        <select
                            id="saliGH"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                            value={saliGH}
                            onChange={(e) => setSaliGH(e.target.value)}
                        >
                            <option value="masterline">Masterline</option>
                            <option value="amtra">Amtra</option>
                            <option value="drak">Drak</option>
                        </select>
                    </div>

                    <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Select KH Salts</h3>
                    <div className="mb-6">
                        <label htmlFor="saliKH" className="block mb-2 text-dark dark:text-gray-200">KH Salts:</label>
                        <select
                            id="saliKH"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                            value={saliKH}
                            onChange={(e) => setSaliKH(e.target.value)}
                        >
                            <option value="drak">Drak</option>
                            <option value="amtra">Amtra</option>
                        </select>
                    </div>
                    
                    {/* Sezione risultati */}
                    {mostraRisultato && (
                        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                            <h3 className="mb-6 text-lg font-semibold text-secondary dark:text-gray-100">Results</h3>
                            {errori.length > 0 ? (
                                <div>
                                    {errori.map((errore, index) => (
                                        <p key={index} className="text-red-500 dark:text-red-400">{errore}</p>
                                    ))}
                                </div>
                            ) : risultati.length > 0 ? (
                                <div>
                                    {risultati.map((risultato, index) => (
                                        <p key={index} className="py-1 text-dark dark:text-gray-200">{risultato}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-dark dark:text-gray-200">No dosage needed or invalid selections.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calcolatore;