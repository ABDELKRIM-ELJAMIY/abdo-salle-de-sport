import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Dashboard</h2>
                <div className="space-y-4">
                    <Link
                        to="/user/reservations"
                        className="block text-center py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        View Reservations
                    </Link>
                    <Link
                        to="/session/1"
                        className="block text-center py-3 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
                    >
                        View Session Details (Example)
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
