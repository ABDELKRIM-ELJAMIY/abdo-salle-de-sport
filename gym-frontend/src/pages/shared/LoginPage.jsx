import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Corrected import

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });

    //         // Save token
    //         const token = response.data.token;
    //         localStorage.setItem('token', token);

    //         // Decode token to extract role
    //         const decoded = jwt_decode(token);
    //         const role = decoded.role; // Ensure your backend includes `role` in the token payload

    //         localStorage.setItem('role', role);

    //         // Redirect based on role
    //         if (role === 'admin') {
    //             navigate('/admin/dashboard');
    //         } else {
    //             navigate('/member/reservations');
    //         }
    //     } catch (err) {
    //         setError('Invalid credentials');
    //     }
    // };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });

            console.log("Login successful:", response.data); // ✅ Debugging

            const token = response.data.token;
            localStorage.setItem('token', token);

            // Decode token to extract role
            const decoded = jwtDecode(token);
            const role = decoded.role;

            localStorage.setItem('role', role);

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin/create-session');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message); // ✅ Debugging
            setError(err.response?.data?.message || 'Invalid credentials');
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
