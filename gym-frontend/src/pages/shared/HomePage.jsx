import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-5xl font-bold text-white mb-6 text-center">
                Welcome to <span className="text-orange-500">Gym</span> Management
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl text-center">
                Achieve your fitness goals with our state-of-the-art gym management system. Track your progress, manage reservations, and stay motivated!
            </p>
            <div className="flex space-x-6">
                <Link
                    to="/register"
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Get Started
                </Link>
                <Link
                    to="/login"
                    className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default HomePage;