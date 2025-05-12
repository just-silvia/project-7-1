import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../components/shared/CustomButton";
import img_register from "../assets/img_form_register.JPG";
import { validatePassword } from "../utilities/secure";
import RevealInput from "../components/shared/RevealInput";
import RevealValidatePassword from "../components/shared/RevealValidatePassword";

const Register = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        subscribeNews: false
    });

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setForm((_form) => ({
            ..._form,
            [name]: newValue
        }));
    };

    useEffect(() => {
        if (error && form.password === form.confirmPassword) {
            setError(false);
        }
    }, [form.password, form.confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (error) {
            setError(false)
        }

        if (form.password !== form.confirmPassword) {
            setError("Le password non coincidono.");
            return;
        }

        console.log("Dati registrazione:", form);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center bg-light px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                    <h2 className="text-center">Register</h2>
                    <div>
                        <label className="block font-medium mb-1">
                            First Name
                            <span className="!text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Last Name
                            <span className="!text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Email
                            <span className="!text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Password
                            <span className="!text-red-500">*</span>
                        </label>
                        <RevealValidatePassword
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onInput={handleChange}
                            required
                            inputClassName="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            errorsClassName="flex flex-col gap-1 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Conferma Password <span className="!text-red-500">*</span>
                        </label>
                        <RevealInput
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onInput={handleChange}
                            required
                            placeholder="Conferma Password"
                            className="w-full p-3 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-accent"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                        <p className="text-sm">
                            Have an account? <Link to="/login" className="text-accent hover:text-primary transition-colors">Login</Link>
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