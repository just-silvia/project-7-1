import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../components/shared/CustomButton';
import imgForm from "../assets/immagini_progetto/foto_login_2.jpg";
import RevealInput from '../components/shared/RevealInput';
import { useApi } from '../hooks/useApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import logo from "../assets/logo-sidebar/logo_sidebar.png";

const Login = () => {
    const dispatch = useDispatch();
    const { post } = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = await post("/login", { email, password }, "AUTH");

            dispatch(login(payload)) // { token: "", user: {} }
            navigate("/app");
        } catch (err) {
            console.log(err);
            toast.error("Utente non trovato");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-light dark:bg-dark dark:text-gray-100">
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
                {/* Lato sinistro - Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-light dark:bg-dark">
                    <div className="max-w-md min-w-[448px]">
                        <h1 className="mb-10">Welcome back!</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 font-medium">
                                    Email Address <span className="!text-red-500 dark:!text-red-800">*</span>
                                </label>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-gray-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 font-medium">
                                    Password <span className="!text-red-500 dark:!text-red-800">*</span>
                                </label>
                                <RevealInput
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-gray-200"
                                    value={password}
                                    onInput={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <Link to="/forgot-password" className="!text-accent hover:!text-primary transition-colors">
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
                            <p className="text-sm">
                                Don't you have an account? {' '}
                                <Link to="/register" className="!text-accent hover:!text-primary transition-colors">
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