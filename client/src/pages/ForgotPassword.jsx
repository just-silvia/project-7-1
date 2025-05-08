import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../components/shared/CustomButton';
import imgResetPSW from "../assets/immagini_progetto/immagine_forgot_psw.jpg";

const ForgotPassword = () => {
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password recovery attempt with:', { account, email });
    // Logica di recupero password
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light">
      <div className="flex flex-col md:flex-row w-full">
        {/* Lato sinistro - Form Reset Pass */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="max-w-md min-w-[448px]">
            <h1 className=" mb-10">Reset Password</h1>

            <p className=" mb-6">
              Please enter your account name and the email used during registration.
              We'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="account" className="block mb-2">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="account"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block  mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-8">
                <Link to="/login" className="">
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