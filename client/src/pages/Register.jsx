import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/shared/CustomButton";
import img_register from "../assets/img_form_register.JPG";
import { validatePassword } from "../utilities/secure";
import RevealInput from "../components/shared/RevealInput";
import RevealValidatePassword from "../components/shared/RevealValidatePassword";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";
import logo from "../assets/logo-sidebar/logo_sidebar.png"

const Register = () => {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        is_privacy_accepted: true,
        confirmPassword: ""
    });

    const { post } = useApi();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    useEffect(() => {
        if (error && form.password === form.confirmPassword) {
            setError(false);
        }
    }, [form.password, form.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error) {
            setError(false)
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const passwordErrors = validatePassword(form.password);
        if (passwordErrors.length > 0) {
            setError("Password does not meet the required criteria.");
            return;
        }

        console.log("Dati registrazione:", form);

        const { first_name, last_name, email, password, is_privacy_accepted } = form;
        try {
            await post("/users", { first_name, last_name, email, password, is_privacy_accepted }, "API");

            toast.success("Register done successfully!", {
                theme: "dark",
            });
            navigate("/app");
        } catch (error) {
            console.log(error);
            toast.error("Error during registration, try again!", {
                theme: "dark",
            });
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 dark:bg-dark dark:text-gray-100"> 
            <div className="absolute top-6 left-6">
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </Link>
            </div>
            <div className="flex items-center justify-center bg-light dark:bg-dark px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                    <h2 className="text-center dark:text-gray-100">Register</h2>
                    <div>
                        <label className="block font-medium mb-1">
                            First Name
                            <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={form.first_name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Last Name
                            <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={form.last_name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Email
                            <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Password
                            <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <RevealValidatePassword
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onInput={handleChange}
                            required
                            inputClassName="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            errorsClassName="flex flex-col gap-1 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Confirm Password <span className="!text-red-500 dark:!text-red-800">*</span>
                        </label>
                        <RevealInput
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onInput={handleChange}
                            required
                            placeholder="Confirm Password"
                            className="w-full p-3 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        {error && <p className="text-red-500 dark:!text-red-800 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                        <p className="text-sm">
                            Have an account? <Link to="/login" className="!text-accent hover:!text-primary transition-colors">Login</Link>
                        </p>
                        <CustomButton
                            type="submit" className="px-6 py-2">Register</CustomButton>
                    </div>
                </form>
            </div>
            <div className="hidden md:flex items-center justify-center bg-gray-100">
                <img
                    src={img_register}
                    alt="Acquario register"
                    className="w-full h-full object-cover max-h-screen"
                />
            </div>
        </div>
    )
}

export default Register;