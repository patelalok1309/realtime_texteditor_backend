import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is authenticated on initial load
    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/user/is-authinticated",
                    {
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                setUser(response.data.user);
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                setUser(null);
                console.log("failed to fetch authentication status ", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Login
    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/user/login",
                credentials,
                { withCredentials: true }
            );
            setUser(response.data.user);
            setIsAuthenticated(true);
            return response?.data;
        } catch (error) {
            console.log("failed to login ", error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Logout
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:5000/api/v1/user/logout");
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.log("failed to logout ", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Register
    const register = useCallback(async (credentials) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/user/register",
                credentials
            );
            setUser(response.data.user);
            setIsAuthenticated(response.data.isAuthenticated);
            return response.data;
        } catch (error) {
            console.log("failed to register ", error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
