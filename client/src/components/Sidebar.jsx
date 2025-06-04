import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo-sidebar/logo_sidebar.png";

function SidebarLink({ iconClass, text, to, onClick }) {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        onClick={onClick} // Aggiungi onClick per chiudere la sidebar
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
          active 
            ? 'bg-blue-50 dark:bg-blue-900 text-accent dark:text-blue-300' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <i className={`fa-solid ${iconClass} w-5 h-5`}></i>
        <span className="font-medium">{text}</span>
      </Link>
    </li>
  );
}

const Sidebar = ({ isOpen, onClose }) => {
  // Funzione per chiudere la sidebar quando si clicca su un link (solo su mobile)
  const handleLinkClick = () => {
    // Chiude solo su mobile, su desktop rimane aperta
    if (window.innerWidth < 768) { // 768px è il breakpoint md di Tailwind
      onClose();
    }
  };

  return (
    <>
      {/* Overlay per mobile - ora più trasparente */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-[2px] bg-opacity-60 z-10 md:hidden" 
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
              <SidebarLink iconClass="fa-table-columns" text="Main Dashboard" to="/app" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-fish-fins" text="Aquariums" to="/app/tanks" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-comments" text="Consultancy" to="/app/consultancy" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-user-tag" text="Request new Brands" to="/app/brands" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-square-root-variable" text="Calculator" to="/app/calculator" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-seedling" text="Plants" to="/app/plants" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-lightbulb" text="Lights" to="/app/lights" onClick={handleLinkClick} />
              <SidebarLink iconClass="fa-user-gear" text="Settings" to="/app/settings" onClick={handleLinkClick} />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;