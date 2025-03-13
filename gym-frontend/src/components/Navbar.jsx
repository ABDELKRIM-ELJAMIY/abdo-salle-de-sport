import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold">Gym Management</Link>
                <div>
                    <Link to="/member/reservations" className="mx-4">Member Reservations</Link>
                    <Link to="/trainer/reservations" className="mx-4">Trainer Reservations</Link>
                    <Link to="/login" className="mx-4">Login</Link> {/* Added Login link */}
                    <Link to="/register" className="mx-4">Register</Link> {/* Added Register link */}
                    {/*<Link to="/profile" className="mx-4">Profile</Link>  Added Profile link */}
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg text-white">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
