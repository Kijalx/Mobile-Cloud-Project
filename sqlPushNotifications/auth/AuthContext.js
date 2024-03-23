import React, { createContext, useState } from 'react';

const AuthContext = createContext(); // Creating the context

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState(''); // Add username state

    // Updated login function to accept user details
    const login = (userDetails) => {
        setIsLoggedIn(true);
        setIsAdmin(userDetails.isAdmin); // Set admin status based on user details
        setUsername(userDetails.username); // Set username based on user details
    };

    const admin = () => {
        setIsAdmin(true);
    };
    
    // Logout function to reset the states
    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false); // Reset admin status on logout
        setUsername(''); // Reset username on logout
    };

    // Values to be provided to the context consumers
    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, username, login, logout, admin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
