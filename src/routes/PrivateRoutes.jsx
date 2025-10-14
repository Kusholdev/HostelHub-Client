import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-dots loading-xl"></span>;
    }
    if (!user) {
        <Navigate state={{ from: location.pathname }} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoutes;