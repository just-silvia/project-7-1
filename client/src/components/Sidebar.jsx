import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo-sidebar/logo_sidebar.png";

function SidebarLink({ text, to }) {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
          active 
            ? 'bg-blue-50 dark:bg-blue-900 text-accent dark:text-blue-300' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <span className="font-medium">{text}</span>
      </Link>
    </li>
  );
}

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay per mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-900 w-60 flex-shrink-0 transition-all rounded-lg duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static h-full z-20 dark:shadow-gray-400 shadow-md `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 flex justify-start items-center">
            <div className="h-12">
              <img src={logo} alt="Logo" className="h-full object-contain" />
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              <SidebarLink text="Main Dashboard" to="/app" />
              <SidebarLink text="Acquari" to="/app/tanks" />
              <SidebarLink text="Richiesta consulenza" to="/app/consultancy" />
              <SidebarLink text="Richiesta Brand" to="/app/brands" />
              <SidebarLink text="Calcolatore" to="/app/calculator" />
              <SidebarLink text="Piante" to="/app/plants" />
              <SidebarLink text="Illuminazione" to="/app/lights" />
              <SidebarLink text="Impostazioni" to="/app/settings" />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;