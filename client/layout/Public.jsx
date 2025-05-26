import { Outlet, useLocation } from "react-router-dom";
import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";
import { checkPath } from "../src/utilities/path";
import { config } from "../src/config";

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