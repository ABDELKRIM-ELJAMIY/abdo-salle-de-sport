import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Sidebar */}
            <AdminNavbar />

            {/* Main content */}
            <div className="flex-1 p-6 flex justify-center items-center">
                <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Admin Dashboard</h2>
                    <div className="space-y-4">
                        {/* Your dashboard content goes here */}
                        <p className="text-white text-center">Welcome to the Admin Dashboard</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
