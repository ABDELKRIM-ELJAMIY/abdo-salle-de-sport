import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Gym Management</h1>
            <div className="flex space-x-4">
                <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Register
                </Link>
                <Link to="/login" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
