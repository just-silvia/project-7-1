import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Footer";
import Navbar from "../pages/Navbar";
import { checkPath } from "../utilities/path";
import { config } from "../config";

const Public = () => {
    const location = useLocation();

    return (
        <>
            {
                checkPath(location.pathname, config.PATH_TO_EXCLUDE.navbar) && <Navbar />
            }
            <Outlet />
            {
                checkPath(location.pathname, config.PATH_TO_EXCLUDE.footer) && <Footer />
            }
        </>
    )
}

export default Public;