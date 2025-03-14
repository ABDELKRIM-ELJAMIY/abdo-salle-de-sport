import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
// Register function
    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     setLoading(true);

    //     // Validation
    //     if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
    //         setError("All fields are required");
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         await axios.post("http://localhost:8000/api/auth/register", formData, {
    //             headers: { "Content-Type": "application/json" }
    //         });

    //         navigate('/login');  // Redirect on success
    //     } catch (err) {
    //         setError(err.response?.data?.message || "Registration failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // new 
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", formData, {
                headers: { "Content-Type": "application/json" }
            });

            // Store token and role in localStorage after successful registration
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role); // Store the role

            navigate('/login');  // Redirect to login page after registration
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

            {error && <div className="text-red-500 bg-red-100 p-2 rounded-md text-center mb-4">{error}</div>}

            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />

                <div className="flex items-center">
                    <label htmlFor="role" className="mr-2 font-semibold">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full text-white p-2 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
