import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

const RegisterPage = () => {
    const navigate = useNavigate();

    // State variables
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email format') // Ensures a valid email format
            .required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').optional(),
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user types
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setLoading(true);

        // Validate the form data using Yup schema
        try {
            await validationSchema.validate(formData, { abortEarly: false }); // Validate all fields at once

            // Proceed with the registration request if validation is successful
            const response = await axios.post("http://localhost:8000/api/auth/register", formData, {
                headers: { "Content-Type": "application/json" }
            });

            // Store token and role in localStorage after successful registration
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role); // Store the role

            navigate('/login');  // Redirect to login page after registration
        } catch (err) {
            if (err.name === 'ValidationError') {
                // Map validation errors to state
                const validationErrors = err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(validationErrors);
            } else {
                setErrors({ general: err.response?.data?.message || "Registration failed" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900"> {/* Flexbox to center the form */}
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">Register</h2>

                {errors.general && <div className="text-red-500 bg-red-100 p-2 rounded-md text-center mb-4">{errors.general}</div>}

                <form onSubmit={handleRegister} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="firstName" className="font-semibold text-white">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        />
                        {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="font-semibold text-white">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        />
                        {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
                    </div>

                    <div>
                        <label htmlFor="phone" className="font-semibold text-white">Phone Number:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        />
                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                    </div>

                    <div>
                        <label htmlFor="email" className="font-semibold text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="font-semibold text-white">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="role" className="mr-2 font-semibold text-white">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="p-2 border border-gray-700 rounded-md w-full bg-gray-700 text-white focus:border-orange-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white p-2 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 focus:border-orange-500"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
