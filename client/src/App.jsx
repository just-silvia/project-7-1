import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Public from "./layout/Public";
import PrivateDashboard from "./layout/PrivateDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";

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
        <Route path="/app" element={<PrivateDashboard />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;