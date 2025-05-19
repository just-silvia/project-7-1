import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../components/shared/CustomButton';
import imgResetPSW from "../assets/immagini_progetto/immagine_forgot_psw.jpg";
import logo from "../assets/logo-sidebar/logo_sidebar.png";
import { useApi } from '../hooks/useApi';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { post } = useApi();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Eseguo la richiesta POST all'endpoint di reset password
      await post("/reset-password", { email }, "AUTH");

      // Se la richiesta ha successo, mostro un messaggio di conferma all'utente
      toast.success("Password reset instructions sent to your email");

      // Reindirizzo l'utente alla pagina di login
      navigate("/login");

    } catch (err) {
      console.log(err);
      // Gestisco l'errore mostrando un messaggio appropriato
      toast.error("Account or email not found");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light dark:bg-dark">
      {/* Logo in alto a sinistra */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Lato sinistro - Form Reset Pass */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="max-w-md min-w-[448px]">
            <h1 className="mb-10">Reset Password</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-dark dark:text-gray-200">
                  Email Address <span className="!text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-8">
                <Link to="/login" className="text-accent dark:text-accent hover:text-dark dark:hover:text-gray-300">
                  Back to Login
                </Link>
                <CustomButton
                  type="default"
                  onClick={handleSubmit}
                >
                  Reset Password
                </CustomButton>
              </div>
            </form>
          </div>
        </div>

        {/* Lato destro - Immagine */}
        <div className="w-full h-screen md:w-1/2">
          <div className="hidden h-full md:block">
            <img
              src={imgResetPSW}
              alt="Pianta"
              className="w-auto h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;