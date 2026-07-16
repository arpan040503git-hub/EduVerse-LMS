import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user } = useAuth();

    return (

        <nav>

            <Link to="/">LearnHub</Link>

            {" | "}

            {
                user ? (
                    <span>Welcome {user.name}</span>
                ) : (
                    <>
                        <Link to="/login">Login</Link>

                        {" | "}

                        <Link to="/register">Register</Link>
                    </>
                )
            }

        </nav>

    );
}

export default Navbar;