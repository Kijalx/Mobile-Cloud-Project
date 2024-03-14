import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

    const login = () => {
        setIsLoggedIn(true);
    };
    const admin = () => {
        setIsAdmin(true);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false); // Reset isAdmin state on logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, admin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
