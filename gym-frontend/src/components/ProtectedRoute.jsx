import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const role = localStorage.getItem('role'); // Get the role from localStorage (or context if you use it)

    if (!role) {
        // Redirect if no role is found (i.e., the user is not logged in)
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        // Redirect to a "Not Authorized" page or a default route if the role is not authorized
        return <Navigate to="/" />;
    }

    return element; // Render the protected component if the user has the right role
};

export default ProtectedRoute;
