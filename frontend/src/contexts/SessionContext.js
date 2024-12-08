import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null); // O un valor predeterminado

    const login = (userSession) => setSession(userSession);
    const logout = () => setSession(null);

    return (
        <SessionContext.Provider value={{ session, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};