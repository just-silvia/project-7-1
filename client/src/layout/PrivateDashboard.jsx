import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';

const PrivateDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="container w-full max-w-[1240px] mx-auto min-h-full">
                        <Outlet className="bg-gray-100 dark:bg-gray-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateDashboard;