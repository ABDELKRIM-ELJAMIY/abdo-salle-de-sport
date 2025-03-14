import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold">Gym Management</Link>
                <div>
                    <Link to="/admin/create-session" className="mx-4">Create Session</Link>
                    <Link to="/admin/trainer-reservations" className="mx-4">Trainer Reservations</Link>
                    <button onClick={() => { localStorage.removeItem('role'); window.location.href = '/login'; }} className="bg-red-500 px-4 py-2 rounded-lg text-white">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
