import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="flex gap-4 border-b">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar;