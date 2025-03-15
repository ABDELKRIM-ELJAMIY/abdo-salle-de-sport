import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-full overflow-hidden">
            {/* Background overlay for a gym-like feel */}
            <div className="absolute inset-0 bg-[url('/gym-background.jpg')] bg-cover bg-center opacity-30"></div>

            <div className="relative z-10 text-center">
                <h1 className="text-6xl font-bold text-white mb-6">
                    Welcome to <span className="text-orange-500">Gym Manager Pro</span>
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    Your ultimate tool for managing gym members, schedules, and progress.
                </p>
                <div className="flex space-x-6">
                    <Link
                        to="/register"
                        className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 shadow-lg"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;