import acquarium from "../assets/immagini/acquario.jpg";
import calculator from "../assets/immagini/calculator.jpg";
import lighting from "../assets/immagini/lights.jpg";
import plants from "../assets/immagini/plants.jpg";
import management from "../assets/immagini/tools.jpg";
import CustomButton from "../components/shared/CustomButton";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-secondary dark:bg-gray-900 py-20 px-4 sm:px-6 md:px-8 pt-30">
        <div className="m-container flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-5/12 text-center md:text-left">
            <h1 className="!text-light dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl">
              Complete solutions for your Aquarium
            </h1>
            <p className="!text-light dark:text-gray-200 text-sm sm:text-base md:text-lg mt-4">
              Complete tools and advice for aquarists: let's manage your
              aquarium together for a healthy and balanced environment.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="hover:opacity-70 active:opacity-70 transition-colors duration-200"
              >
                <CustomButton>Get started now!</CustomButton>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <img
              src={acquarium}
              alt="acquario in esposizione"
              className="rounded-xl shadow-md object-cover w-full h-auto max-h-96 md:max-h-full border-secondary dark:border-gray-500 border-1 p-1"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main>
        {/* Section 1: Calculator */}
        <section className="bg-light dark:bg-dark py-20 px-4 sm:px-6 md:px-8">
          <div className="m-container flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-5/12 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl">
                Calculator for various dosages
              </h2>
              <h3 className="dark:text-gray-200 text-sm sm:text-md mt-2">
                Precise dosages for a balanced ecosystem
              </h3>
              <p className="mb-6 text-sm sm:text-base text-dark dark:text-gray-200 mt-4">
                The calculator will help you determine the correct amounts of
                fertilizers, CO₂ and supplements to add based on the volume of
                the tank.
              </p>
              <CustomButton>Find out more!</CustomButton>
            </div>
            <div className="w-full md:w-5/12">
              <img
                src={calculator}
                alt="sostanze chimiche con pc"
                className="rounded-xl shadow-md object-cover w-full h-auto max-h-96 md:max-h-full border-secondary dark:border-gray-500 border-1 p-1"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Plants */}
        <section className="dark:bg-gray-800 py-20 px-4 sm:px-6 md:px-8">
          <div className="m-container flex flex-col md:flex-row-reverse items-center justify-center gap-8">
            <div className="w-full md:w-5/12 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl">
                Care of aquatic plants
              </h2>
              <h3 className="dark:text-gray-200 text-sm sm:text-md mt-2">
                Optimal plant health and growth
              </h3>
              <p className="mb-6 text-sm sm:text-base text-dark dark:text-gray-200 mt-4">
                Aquarium plants require regular fertilization, pruning, and
                light control. Choose species that are compatible and monitor
                for deficiencies or algae.
              </p>
              <CustomButton>Find out more!</CustomButton>
            </div>
            <div className="w-full md:w-5/12">
              <img
                src={plants}
                alt="piante varie in acquario"
                className="rounded-xl shadow-md object-cover w-full h-auto max-h-96 md:max-h-full border-secondary dark:border-gray-500 border-1 p-1"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Lighting */}
        <section className="bg-light dark:bg-dark py-20 px-4 sm:px-6 md:px-8">
          <div className="m-container flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-5/12 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl">
                Aquarium lighting management
              </h2>
              <h3 className="dark:text-gray-200 text-sm sm:text-md mt-2">
                The right light for a flourishing aquarium
              </h3>
              <p className="mb-6 text-sm sm:text-base text-dark dark:text-gray-200 mt-4">
                Correct lighting promotes plant growth and well-being. Choose
                suitable lights and adjust based on the type of aquarium.
              </p>
              <CustomButton>Find out more!</CustomButton>
            </div>
            <div className="w-full md:w-5/12">
              <img
                src={lighting}
                alt="acquario con illuminazione"
                className="rounded-xl shadow-md object-cover w-full h-auto max-h-96 md:max-h-full border-secondary dark:border-gray-500 border-1 p-1"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Summary */}
        <section className="bg-accent dark:bg-gray-700 py-20 px-4 sm:px-6 md:px-8">
          <div className="m-container flex flex-col md:flex-row-reverse items-center justify-center gap-8">
            <div className="w-full md:w-5/12 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl dark:text-gray-100">
                Aquarium Management Summary
              </h2>
              <p className="mb-6 text-sm sm:text-base text-dark dark:text-gray-200 mt-4">
                A healthy aquarium requires a balance of nutrients, lighting and
                plant care. Constant monitoring ensures a stable and pleasing
                environment.
              </p>
              <Link
                to="/register"
                className="hover:opacity-70 active:opacity-70 transition-colors duration-200"
              >
                <CustomButton>Get started now!</CustomButton>
              </Link>
            </div>
            <div className="w-full md:w-5/12">
              <img
                src={management}
                alt="management aquariums"
                className="rounded-xl shadow-md object-contains w-full h-auto max-w-[350px] md:max-w-[400px] max-h-[450 px] md:max-h-[500px] border-secondary dark:border-gray-500 border-1 p-1"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
