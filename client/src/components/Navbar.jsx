import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/img-nav-footer/logosara.png";
import CustomButton from "./shared/CustomButton";
import { useSettings } from "../hooks/useSettings";

const Navbar = () => {
    const { settings: { darkMode }, toggleDarkMode } = useSettings();
    // Stato per gestire la visibilità del menu
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);
    
    // Funzione per toggleare la dark mode
    const handleToggleDarkMode = () => {
        toggleDarkMode(!darkMode);
    };
   
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav className="w-full z-10 fixed border-b py-4 bg-white dark:bg-dark">
            <div className="w-full px-5 mx-auto flex items-center justify-between">
                {/* Sezione Logo */}
                <div className="flex items-center space-x-2">
                    <img 
                        src={logo} 
                        alt="Logo Aquatic Paradise"
                        className="h-8 w-8" 
                    />
                    <span className="text-xl font-bold !text-primary hover:!text-accent cursor-pointer dark:text-accent dark:hover:!text-primary">
                        Aquatic Paradise
                    </span>
                </div>
                
                {/* Sezione Hamburger Menu (visibile su schermi piccoli) */}
                <div className="md:hidden flex items-center">
                    {/* Bottone Dark Mode (mobile) */}
                    <button 
                        onClick={handleToggleDarkMode} 
                        className="p-2 mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-dark dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    
                    <button 
                        onClick={toggleMenu} 
                        className="text-primary hover:text-accent focus:outline-none dark:text-accent dark:hover:text-primary"
                        aria-label="Toggle mobile menu"
                    >
                        {/* Icona hamburger o X in base allo stato */}
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
                
                {/* Sezione Link (desktop) */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-dark hover:text-accent transition-colors dark:text-gray-200 dark:hover:text-accent">Home</Link>
                    <Link to="/login" className="text-dark hover:text-accent transition-colors dark:text-gray-200 dark:hover:text-accent">
                        <CustomButton type="default">Login</CustomButton>
                    </Link>
                    <Link to="/register" className="text-dark hover:text-accent transition-colors dark:text-gray-200 dark:hover:text-accent">
                        <CustomButton type="inverse">Register</CustomButton>
                    </Link>
                    
                    {/* Bottone Dark Mode (desktop) */}
                    <button 
                        onClick={toggleDarkMode} 
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-dark dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            
            {/* Menu mobile (visibile solo se isOpen è true) */}
            {isOpen && (
                <div className="md:hidden fixed inset-x-0 top-16 bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <Link to="/" className="text-dark hover:!text-accent transition-colors dark:text-gray-200 dark:hover:!text-accent">Home</Link>
                        <Link to="/login">
                            <CustomButton type="default">Login</CustomButton>
                        </Link>
                        <Link to="/register">
                            <CustomButton type="inverse">Register</CustomButton>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;