import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h2>
                <div className="space-y-4">
                    <Link
                        to="/admin/create-session"
                        className="block text-center py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Create New Session
                    </Link>
                    <Link
                        to="/admin/trainer-reservations"
                        className="block text-center py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Manage Trainer Reservations
                    </Link>
                    <Link
                        to="/admin/modify-trainer-reservation/1"
                        className="block text-center py-3 px-6 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300"
                    >
                        Modify Reservation (Example)
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
