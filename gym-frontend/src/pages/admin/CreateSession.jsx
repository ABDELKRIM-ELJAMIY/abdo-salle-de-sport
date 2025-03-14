import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup'; // Import Yup for validation
import { useFormik } from 'formik'; // Import Formik for form handling
import AdminNavbar from '../../components/AdminNavbar';

const CreateSession = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem('token'); // Get token from localStorage

    // Check if the token is available
    if (!token) {
        setError("No authentication token found. Please log in.");
        return;
    }

    // Validation schema using Yup
    const validationSchema = Yup.object({
        sessionName: Yup.string().required('Session name is required'),
        startDate: Yup.date().required('Start date is required').nullable(),
        endDate: Yup.date()
            .required('End date is required')
            .min(Yup.ref('startDate'), 'End date must be later than start date')
            .nullable(),
        trainerName: Yup.string().required('Trainer name is required'),
        capacity: Yup.number().positive('Capacity must be a positive number').required('Capacity is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            sessionName: '',
            startDate: '',
            endDate: '',
            trainerName: '',
            capacity: '',
            status: 'Available',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const sessionData = {
                sessionName: values.sessionName,
                startDate: new Date(values.startDate).toISOString(),
                endDate: new Date(values.endDate).toISOString(),
                trainerName: values.trainerName,
                capacity: values.capacity,
                status: values.status,
            };

            try {
                const response = await axios.post('http://localhost:8000/api/sessions', sessionData, {
                    headers: {
                        'x-auth-token': token,
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setSuccessMessage('Session created successfully!');
                // Reset form
                formik.resetForm();
            } catch (err) {
                if (err.response) {
                    console.error("Error response:", err.response);
                    setError(`Error: ${err.response.data.message || 'Failed to create session'}`);
                } else if (err.request) {
                    console.error("Error request:", err.request);
                    setError("No response received from server.");
                } else {
                    console.error("Error message:", err.message);
                    setError('An unexpected error occurred.');
                }
            }
        },
    });

    return (
        <div className="min-h-screen bg-gray-900 flex">
            <AdminNavbar /> {/* AdminNavbar is added here on the left */}
            <div className="flex-grow p-6">
                <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">Create a New Session</h1>
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                    {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="sessionName" className="font-semibold text-white">Session Name:</label>
                            <input
                                type="text"
                                id="sessionName"
                                name="sessionName"
                                placeholder="Session Name"
                                value={formik.values.sessionName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            />
                            {formik.touched.sessionName && formik.errors.sessionName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.sessionName}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="startDate" className="font-semibold text-white">Start Date:</label>
                            <input
                                type="datetime-local"
                                id="startDate"
                                name="startDate"
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            />
                            {formik.touched.startDate && formik.errors.startDate && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="endDate" className="font-semibold text-white">End Date:</label>
                            <input
                                type="datetime-local"
                                id="endDate"
                                name="endDate"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            />
                            {formik.touched.endDate && formik.errors.endDate && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="trainerName" className="font-semibold text-white">Trainer Name:</label>
                            <input
                                type="text"
                                id="trainerName"
                                name="trainerName"
                                placeholder="Trainer Name"
                                value={formik.values.trainerName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            />
                            {formik.touched.trainerName && formik.errors.trainerName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.trainerName}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="capacity" className="font-semibold text-white">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                placeholder="Capacity"
                                value={formik.values.capacity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            />
                            {formik.touched.capacity && formik.errors.capacity && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.capacity}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="status" className="font-semibold text-white">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="Available">Available</option>
                                <option value="Full">Full</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            Create Session
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSession;
