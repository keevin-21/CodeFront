import React, { createContext, useContext, useState } from "react";

// Crea el contexto con un valor predeterminado vacío o nulo
const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null); // O un valor predeterminado

    const login = (userSession) => {
        setSession(userSession); // Inicia la sesión
    };

    const logout = () => {
        setSession(null); // Cierra la sesión
    };

    return (
        <SessionContext.Provider value={{ session, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
