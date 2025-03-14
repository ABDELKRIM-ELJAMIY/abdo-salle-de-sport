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
        <div>
            <h1 className="text-2xl font-semibold mb-4">Sessions</h1>
            {error && <div className="text-red-500">{error}</div>}
            <div>
                {sessions.length === 0 ? (
                    <p>No sessions available.</p>
                ) : (
                    <ul>
                        {sessions.map((session) => (
                            <li key={session._id} className="border-b p-4">
                                <h3 className="text-xl">{session.sessionName}</h3>
                                <p><strong>Trainer:</strong> {session.trainerName}</p>
                                <p><strong>Date:</strong> {new Date(session.startDate).toLocaleString()}</p>
                                <p><strong>Capacity:</strong> {session.capacity}</p>
                                <p><strong>Status:</strong> {session.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SessionPage;
