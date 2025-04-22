import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Public from "./layout/Public";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;