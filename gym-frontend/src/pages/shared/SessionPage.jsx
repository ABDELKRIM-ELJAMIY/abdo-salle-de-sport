import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionPage = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token'); // Get token from localStorage

    // Fetch sessions from the backend when the component mounts
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/sessions', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setSessions(response.data); // Set fetched sessions in state
            } catch (err) {
                console.error('Error fetching sessions:', err);
                setError('Failed to load sessions');
            }
        };

        fetchSessions();
    }, [token]);

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sessions</h1>
            {error && <div className="text-red-600 text-lg mb-4">{error}</div>}
            <div className="flex flex-wrap gap-6 justify-center">
                {sessions.length === 0 ? (
                    <p className="text-gray-600">No sessions available.</p>
                ) : (
                    sessions.map((session) => (
                        <div
                            key={session._id}
                            className="bg-white shadow-md rounded-lg p-4 w-80 transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-indigo-50"
                        >
                            <h3 className="text-xl text-indigo-600 font-semibold mb-2 text-center">{session.sessionName}</h3>
                            <p className="text-lg text-gray-700"><strong>Trainer:</strong> {session.trainerName}</p>
                            <p className="text-lg text-gray-700"><strong>Date:</strong> {new Date(session.startDate).toLocaleString()}</p>
                            <p className="text-lg text-gray-700"><strong>Capacity:</strong> {session.capacity}</p>
                            <p className="text-lg text-gray-700"><strong>Status:</strong> {session.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SessionPage;
