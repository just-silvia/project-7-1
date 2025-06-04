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
            toast.error("User not found", {
                theme: "dark",
            });
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

            {/* Lato sinistro - Form */}
            <div className="flex items-center justify-center bg-light dark:bg-dark px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                    <h1 className="text-center dark:text-gray-100">Welcome back!</h1>

                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">
                            Email Address <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium mb-1">
                            Password <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <RevealInput
                            placeholder="Password"
                            name="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                        <Link to="/forgot-password" className="!text-accent hover:!text-primary transition-colors text-sm">
                            Forgot Password?
                        </Link>
                        <CustomButton
                            type="submit"
                            className="px-6 py-2"
                        >
                            Sign In
                        </CustomButton>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-center">
                            Don't you have an account? {' '}
                            <Link to="/register" className="!text-accent hover:!text-primary transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Lato destro - Immagine */}
            <div className="hidden md:flex items-center justify-center bg-gray-100">
                <img
                    src={imgForm}
                    alt="Acquario"
                    className="w-full h-full object-cover max-h-screen"
                />
            </div>
        </div>
    );
};

export default Login;