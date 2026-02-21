import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        const sessionExpiry = localStorage.getItem('sessionExpiry');

        if (storedUser && sessionExpiry) {
            if (Date.now() > parseInt(sessionExpiry)) {
                logout();
            } else {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        }
        setLoading(false);
    }, []);

    // Session timeout check
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(() => {
            const sessionExpiry = localStorage.getItem('sessionExpiry');
            if (sessionExpiry && Date.now() > parseInt(sessionExpiry)) {
                logout();
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === userData.email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = { ...userData, id: Date.now() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const sessionDuration = 5 * 60 * 1000; // 5 minutes
            const sessionExpiry = Date.now() + sessionDuration;

            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('sessionExpiry', sessionExpiry.toString());

            setUser(user);
            setIsAuthenticated(true);
            return true;
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionExpiry');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateProfile = (updatedData) => {
        if (!user) return;

        // Update current session user
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update Local Storage

        // Update user in 'users' array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    }


    const value = {
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
