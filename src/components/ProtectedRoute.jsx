import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkAuthentication = useCallback(
        async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/v1/user/is-authinticated",
                    { withCredentials: true }
                );
                setIsAuthenticated(res.data.isAuthenticated);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
            }   
        },
        [rest]
    )
    

    useEffect(() => {
        checkAuthentication();
    }, [rest]);

    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#212121]">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <p className="text-[#F8F8F2] ml-2">Loading...</p>
            </div>
        );
    }

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace />
    );
}

export default ProtectedRoute;
