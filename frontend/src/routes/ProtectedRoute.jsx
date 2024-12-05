// ProtectedRoot.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const ProtectedRoute = ({ children }) => {
    const { session } = useSession();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;