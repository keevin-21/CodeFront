// SessionContext.js
import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Intenta obtener la sesión desde localStorage al inicio
        const storedUser = localStorage.getItem("currentUser");
        return storedUser ? JSON.parse(storedUser) : null; // Si existe, lo parsea y lo devuelve
    });

    const login = (user) => {
        console.log("Logging in:", user);
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Guarda la sesión en localStorage
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser"); // Elimina la sesión al cerrar sesión
    };

    return (
        <SessionContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
