import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { checkPath } from "../utilities/path";
import { config } from "../config";

const Public = () => {
    const location = useLocation();

    return (
        <>
            {
                checkPath(location.pathname, config.PATH_TO_EXCLUDE.navbar) && <Navbar />
            }
            <div className="pt-10">
                <Outlet />
            </div>
            {
                checkPath(location.pathname, config.PATH_TO_EXCLUDE.footer) && <Footer />
            }
        </>
    )
}

export default Public;