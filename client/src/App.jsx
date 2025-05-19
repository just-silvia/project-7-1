import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Public from "./layout/Public";
import PrivateDashboard from "./layout/PrivateDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Aquariums from "./pages/dashboard/Aquariums";
import Consultancy from "./pages/dashboard/Consultancy";
import Calcolatore from './pages/dashboard/Calcolatore';
import RequestNewBrands from "./pages/dashboard/RequestNewBrands";

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (token == null) return <Navigate to="/login" />

    return children;
}

const App = () => {
    return (
        <>
            <Routes>
                {/* Public route */}
                <Route path="/" element={<Public />}>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Route>
                {/* Private route */}
                <Route path="/app" element={
                    <ProtectedRoute>
                        <PrivateDashboard />
                    </ProtectedRoute>
                }>
                    <Route path="" element={<DashboardHome />} />
                    <Route path="tanks" element={<Aquariums />} />
                    <Route path="calculator" element={<Calcolatore />} />
                    <Route path="consultancy" element={<Consultancy />} />
                    <Route path="brands" element={<RequestNewBrands />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;