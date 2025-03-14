import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold">Gym Management</Link>
                <div>
                    <Link to="/member/reservations" className="mx-4">Reservations</Link>
                    <Link to="/login" className="mx-4">Login</Link>
                    <Link to="/register" className="mx-4">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
