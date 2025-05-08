import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../components/shared/CustomButton';
import imgForm from "../assets/immagini_progetto/foto_login_2.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Logica di autenticazione


  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5ff]">
      <div className="flex flex-col md:flex-row w-full">
        {/* Lato sinistro - Form */}
        <div className="w-full md:w-1/2 flex  items-center justify-center">
          <div className="max-w-md min-w-[448px]">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">Welcome back!</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#50b99a]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#50b99a]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-8">
                <Link to="/forgot-password" className="text-gray-500 hover:text-[#50b99a]">
                  Forgot Password ?
                </Link>
                <CustomButton
                  type="default"
                  onClick={handleSubmit}
                >
                  Sign In
                </CustomButton>
              </div>
            </form>

            <div className="mt-6">
              <p className="text-gray-600">
                Don't you have an account? {' '}
                <Link to="/register" className="text-[#50b99a] hover:text-[#4281a4ff]">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Lato destro - Immagine */}
        <div className="w-full h-screen md:w-1/2">
          <div className="hidden h-full md:block">
            <img
              src={imgForm}
              alt="Acquario"
              className="w-auto h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;