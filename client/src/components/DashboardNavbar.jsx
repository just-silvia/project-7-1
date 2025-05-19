import { useState, useEffect } from 'react';
import { logout } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ onToggleSidebar, sidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentPages, setRecentPages] = useState([]);
  
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    const savedPages = localStorage.getItem('recentPages');
    if (savedPages) {
      setRecentPages(JSON.parse(savedPages));
    }
  }, []);
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add search to recent searches
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      // Handle actual search here
      console.log('Searching for:', searchQuery);
      closeSearchModal();
    }
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    // Execute search
    console.log('Searching for:', search);
    closeSearchModal();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  }

  const getInitialsName = (first_name, last_name) => {
    return `${first_name.charAt(0)}${last_name.charAt(0)}`
  }

  return (
    <>
      <div>
        <div className="bg-light dark:bg-gray-800 dark:shadow-gray-400 shadow-sm h-16 flex items-center justify-between px-4">
          {/* Mobile sidebar toggle */}
          <button className="md:hidden p-2" onClick={onToggleSidebar}>
            {sidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Search Icon Button */}
            <button
              onClick={openSearchModal}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <svg 
                className="w-5 h-5 text-accent" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z"></path>
                <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z"></path>
              </svg>
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                onClick={toggleUserMenu}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {getInitialsName(user.first_name, user.last_name)}
                </div>
                <span className="font-medium hidden sm:inline">{user.first_name} {user.last_name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 w-48">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchModalOpen && (
        <div 
          className="fixed inset-0 bg-black/[0.09] z-50" 
          onClick={closeSearchModal}
        >
          <div className="mt-16 w-full max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
              {/* Search form */}
              <form className="border-b border-gray-200 dark:border-gray-700 p-4" onSubmit={handleSearch}>
                <div className="relative">
                  <label htmlFor="modal-search" className="sr-only">Search</label>
                  <input
                    id="modal-search"
                    className="w-full pl-4 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                    type="search"
                    placeholder="Search anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                    type="submit"
                    aria-label="Search"
                  >
                    <svg className="w-4 h-4 text-accent" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path>
                      <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"></path>
                    </svg>
                  </button>
                </div>
              </form>

              <div className="p-4 max-h-96 overflow-y-auto">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-3">Recent searches</div>
                    <ul className="text-sm">
                      {recentSearches.map((search, index) => (
                        <li key={index}>
                          <a 
                            className="flex items-center py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer" 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); handleRecentSearchClick(search); }}
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                            </svg>
                            <span>{search}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recent pages */}
                {recentPages.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-3">Recent pages</div>
                    <ul className="text-sm">
                      {recentPages.map((page, index) => (
                        <li key={index}>
                          <a 
                            className="flex items-center py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer" 
                            href={page.url} 
                            onClick={closeSearchModal}
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z"></path>
                            </svg>
                            <span>{page.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Message when no recent searches */}
                {recentSearches.length === 0 && recentPages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    Start searching to see your recent searches here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;