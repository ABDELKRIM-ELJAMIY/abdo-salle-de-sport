import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Corrected import
import * as Yup from 'yup'; // Import Yup for validation

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        setFormErrors({ ...formErrors, [name]: '' }); // Clear previous error when user types
    };

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate form data
        try {
            await validationSchema.validate({ email, password }, { abortEarly: false });

            // Proceed with the login request if validation is successful
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
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                const validationErrors = err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setFormErrors(validationErrors); // Set form errors
            } else {
                console.error("Login error:", err.response?.data || err.message); // ✅ Debugging
                setError(err.response?.data?.message || 'Invalid credentials');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Login</h2>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="font-semibold text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                        />
                        {formErrors.email && <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="font-semibold text-white">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                        />
                        {formErrors.password && <div className="text-red-500 text-sm mt-1">{formErrors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
