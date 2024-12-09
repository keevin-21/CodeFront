import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useSession();

    if (!currentUser) {
        // Si no hay usuario en la sesión, redirige al login
        return <Navigate to="/login" />;
    }

    return children; // Si el usuario está autenticado, muestra el contenido protegido
};

export default ProtectedRoute;
