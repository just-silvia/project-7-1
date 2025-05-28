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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 dark:bg-dark dark:text-gray-100">
      {/* Logo in alto a sinistra */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Lato sinistro - Form Reset Pass */}
      <div className="flex items-center justify-center bg-light dark:bg-dark px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h1 className="text-center dark:text-gray-100">Reset Password</h1>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address <span className="!text-red-500 dark:!text-red-800">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <Link to="/login" className="!text-accent hover:!text-primary transition-colors text-sm">
              Back to Login
            </Link>
            <CustomButton
              type="submit"
              className="px-6 py-2"
            >
              Reset Password
            </CustomButton>
          </div>
        </form>
      </div>

      {/* Lato destro - Immagine */}
      <div className="hidden md:flex items-center justify-center bg-gray-100">
        <img
          src={imgResetPSW}
          alt="Pianta"
          className="w-full h-full object-cover max-h-screen"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;