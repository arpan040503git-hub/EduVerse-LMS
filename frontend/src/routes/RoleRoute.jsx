import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ children, role }) {

    const { user, loading } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RoleRoute;