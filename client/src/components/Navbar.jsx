import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/img-nav-footer/logosara.png";
import CustomButton from "../components/shared/CustomButton";

const Navbar = () => {
    // Stato per gestire la visibilità del menu
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    // Chiudi il menu quando cambia la route
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);
    
   
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="fixed top-0 w-full z-50">
            <nav className="relative z-10 shadow-sm py-4 bg-white">
            <div className=" w-full max-w-[1168px] px-5 mx-auto flex items-center justify-between">
                {/* Sezione Logo */}
                <div className="flex items-center space-x-2">
                    <img 
                        src={logo} 
                        alt="Logo Aquatic Paradise"
                        className="h-8 w-8" 
                    />
                    <span className=" sm:text-lg md:text-xl font-bold !text-primary hover:!text-accent active:!text-accent cursor-pointer">
                        Aquatic Paradise
                    </span>
                </div>
                
                {/* Sezione Hamburger Menu (visibile su schermi piccoli) */}
                <div className="md:hidden flex items-center">
                    <button 
                        onClick={toggleMenu} 
                        className="text-primary hover:!text-accent active:!text-accent focus:outline-none"
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
                    <Link to="/" className="!text-gray-700 hover:!text-accent active:!text-accent transition-colors">Home</Link>
                    <Link to="/login" className="!text-gray-700 hover:!text-accent transition-colors">
                        <CustomButton type="default">Login</CustomButton>
                    </Link>
                    <Link to="/register" className="!text-gray-700 hover:!text-accent transition-colors">
                        <CustomButton type="inverse">Register</CustomButton>
                    </Link>
                </div>
            </div>
            
            {/* Menu mobile (visibile solo se isOpen è true) */}
            {isOpen && (
                <div className="md:hidden fixed inset-x-0 top-16 bg-white border-t border-gray-200 shadow-lg z-40">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <Link to="/" className="!text-gray-700 hover:!text-accent active:!text-accent transition-colors">Home</Link>
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
        </div>
        
    );
};

export default Navbar;