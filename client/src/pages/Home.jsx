import acquarium from "../assets/immagini/acquario.jpg";
import calculator from "../assets/immagini/calcolatrice.jpg";
import lighting from "../assets/immagini/illuminazione.jpg";
import plants from "../assets/immagini/piante.jpg";
import CustomButton from "../components/shared/CustomButton";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      {/* Header */}

      <header className="bg-secondary mx-auto py-20 px-4 sm:px-6 md:px-8">
        <div className="m-container flex gap-8">
          <div className="flex flex-col flex-1 gap-4 pr-24">
            <h1 className="font-bold text-[#f5f5f5ff] text-2xl sm:text-3xl md:text-4xl">
              Soluzioni Complete per il Tuo Acquario
            </h1>
            <p className="text-[#f5f5f5ff] text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Strumenti e consigli completi per aquariofili: gestiamo insieme il
              tuo acquario per un ambiente sano e bilanciato.
            </p>

            {/* Call to Action */}
            <div className="mt-8">
              <Link to="/register">
                <CustomButton>Inizia ora!</CustomButton>
              </Link>
            </div>
          </div>

          {/* Parte dell'immagine da mettere*/}
          <div className="flex-1">
            <img
              src={acquarium}
              alt="acquario in esposizione"
              className="w-full h-auto mx-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main>
        {/*1° sezione-Calcolatore */}
        <section className="bg-light mx-auto flex flex-col md:flex-row items-center gap-8 px-4 sm:px-6 md:px-8 py-20">
          <div className="m-container flex gap-8 items-center justify-center">
            <div className="w-full md:w-5/12 flex flex-col md:text-left gap-4">
              <div>
                <h2 className="text-secondary font-bold text-xl sm:text-2xl md:text-3xl">
                  Calcolatore per vari dosaggi
                </h2>
                <h3 className="text-[#1f1f1fff] font-semibold text-sm sm:text-md">
                  Dosaggi precisi per un ecosistema equilibrato
                </h3>
              </div>
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                Il calcolatore in questione, aiuterà a determinare le quantità
                corrette di fertilizzanti, CO₂ e integratori da aggiungere in
                base al volume della vasca e ai bisogni delle piante e pesci. È
                fondamentale per mantenere l’equilibrio chimico dell’acqua.
              </p>
              <div className="w-full md:w-auto">
                <CustomButton>Scopri di più!</CustomButton>
              </div>
            </div>

            {/* Parte dell'immagine da mettere*/}
            <div className="w-full md:w-5/12">
              <img
                src={calculator}
                alt="sostanze chimiche con pc"
                className="rounded-xl shadow-md object-cover w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/*2° sezione-Piante */}
        <section className="mx-auto flex flex-col md:flex-row items-center gap-8 px-4 text-[#1f1f1fff]-100 sm:px-6 md:px-8 py-20">
          <div className="m-container flex gap-8 items-center justify-center">
            {/* Parte dell'immagine da mettere*/}
            <div className="w-full md:w-5/12">
              <img
                src={plants}
                alt="piante varie in acquario"
                className="rounded-xl shadow-md object-cover w-full h-auto"
              />
            </div>
            <div className="w-full md:w-5/12 flex flex-col md:text-left gap-4">
              <div>
                <h2 className="text-secondary font-bold text-xl sm:text-2xl md:text-3xl">
                  Cura delle piante acquatiche
                </h2>
                <h3 className="text-[#1f1f1fff] font-semibold text-sm sm:text-md">
                  Salute e crescita ottimale delle piante
                </h3>
              </div>
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                Le piante in acquario richiedono fertilizzazione regolare,
                potature e controllo della luce. È importante scegliere specie
                compatibili con l’ambiente e monitorare eventuali carenze
                nutrizionali o alghe.
              </p>
              <div className="w-full md:w-auto">
                <CustomButton>Scopri di più!</CustomButton>
              </div>
            </div>
          </div>
        </section>

        {/*3° sezione-Illuminazione */}
        <section className="mx-auto flex flex-col bg-light md:flex-row items-center gap-8 px-4 sm:px-6 md:px-8 py-20">
          <div className="m-container flex gap-8 items-center justify-center">
            <div className="w-full md:w-5/12 flex flex-col md:text-left gap-4">
              <div>
                <h2 className="font-bold text-secondary text-xl sm:text-2xl md:text-3xl">
                  Gestione dell’illuminazione dell'acquario
                </h2>
                <h3 className="font-semibold text-[#1f1f1fff] text-sm sm:text-md">
                  La luce giusta per un acquario rigoglioso
                </h3>
              </div>
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                Una corretta illuminazione favorisce la crescita delle piante e
                mantiene il benessere degli organismi. Bisogna scegliere luci
                adatte e regolare fotoperiodo e intensità in base alla tipologia
                di acquario.
              </p>
              <div className="w-full md:w-auto">
                <CustomButton>Scopri di più!</CustomButton>
              </div>
            </div>
            {/* Parte dell'immagine da mettere*/}
            <div className="w-full md:w-5/12">
              <img
                src={lighting}
                alt="acquario con illuminazione"
                className="rounded-xl shadow-md object-cover  w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/*4° sezione uguale alla Header*/}
        <section className="mx-auto flex flex-col bg-[#50b99aff] md:flex-row items-center gap-8 px-4 sm:px-6 md:px-8 py-20">
          <div className="m-container flex gap-8 items-center justify-center">
            {/* Parte dell'immagine da mettere*/}
            <div className="w-full md:w-5/12">
              <img src={lighting} alt="luce" className="w-full h-auto object-cover" />
            </div>
            <div className="w-full md:w-5/12 flex flex-col md:text-left gap-4">
              <div>
                <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
                  Riepilogo gestione acquario
                </h2>
              </div>
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                Un acquario sano richiede equilibrio tra nutrienti,
                illuminazione e cura delle piante. Monitoraggio costante e
                interventi tempestivi assicurano un ambiente stabile e
                visivamente gradevole.
              </p>
              {/* Call to Action */}
              <div className="w-full md:w-auto text-center">
                <Link to="/register">
                  <CustomButton>Inizia ora!</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
