import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg py-3 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition duration-300">
                    Gym Management
                </Link>
                <div className="flex space-x-6">
                    <Link to="/user/reservations" className="text-white hover:text-gray-300 text-lg font-medium transition duration-300">
                        Reservations
                    </Link>
                    <Link to="/login" className="text-white hover:text-gray-300 text-lg font-medium transition duration-300">
                        Login
                    </Link>
                    <Link to="/register" className="text-white hover:text-gray-300 text-lg font-medium transition duration-300">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
