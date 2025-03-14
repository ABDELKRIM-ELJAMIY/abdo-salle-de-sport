import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send login request
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });

            // Save token and role in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            // Check the role and navigate accordingly
            const role = response.data.role;
            if (role === 'admin') {
                navigate('/admin/dashboard'); // Redirect to admin dashboard
            } else if (role === 'user') {
                navigate('/member/reservations'); // Redirect to member reservation page
            }
        } catch (err) {
            // Handle error if login fails
            setError('Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
