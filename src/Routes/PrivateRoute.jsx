import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { Loader } from 'lucide-react';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-10 h-10 animate-spin text-yellow-500" />
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/athentication" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
