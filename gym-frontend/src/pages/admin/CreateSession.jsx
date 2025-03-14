import React, { useState } from 'react';
import axios from 'axios';

const CreateSession = () => {
    const [sessionName, setSessionName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trainerName, setTrainerName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [status, setStatus] = useState('Available');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token'); // Get token from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sessionData = {
            sessionName,
            startDate,
            endDate,
            trainerName,
            capacity,
            status,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/sessions', sessionData, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setSuccessMessage('Session created successfully!');
            // Reset form
            setSessionName('');
            setStartDate('');
            setEndDate('');
            setTrainerName('');
            setCapacity('');
            setStatus('Available');
        } catch (err) {
            setError('Failed to create session');
            console.error(err);
        }
    };

    return (
        <div className="create-session">
            <h1 className="text-2xl font-semibold mb-4">Create a New Session</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Session Name"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Trainer Name"
                        value={trainerName}
                        onChange={(e) => setTrainerName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="Available">Available</option>
                        <option value="Full">Full</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md"
                    >
                        Create Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSession;
