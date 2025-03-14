import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token'); // Get token from localStorage

    // Fetch reservations when component loads
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservations', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setReservations(response.data);
            } catch (err) {
                console.error('Error fetching reservations:', err);
            }
        };

        fetchReservations();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationData = {
            date,
            time,
            description,
        };

        try {
            const response = await axios.post(
                'http://localhost:8000/api/reservations',
                reservationData,
                {
                    headers: {
                        'x-auth-token': token, // Include token in the header
                    },
                }
            );
            setSuccessMessage('Reservation created successfully!');
            setReservations([...reservations, response.data]); // Update the reservation list
        } catch (err) {
            setError('Failed to create reservation');
            console.error(err);
        }
    };

    // Reservation Card component within the same file
    const ReservationCard = ({ reservation }) => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold">{reservation.sessionName || 'Session Name'}</h3>
                <h1>Reservation</h1>
                <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
                <p>Time: {reservation.time}</p>
                <p>test:{reservations.description}</p>
                <p>Description: {reservation.description}</p>
                <p>Status: {reservation.status || 'Not Available'}</p>
            </div>
        );
    };

    return (
        <div className="reservation-page">
            <h1 className="text-2xl font-semibold mb-4">Create Reservation</h1>
            {error && <div className="error text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="success text-green-500 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="space-y-4">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full p-2 border rounded-md"
                        required
                    ></textarea>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                        Create Reservation
                    </button>
                </div>
            </form>

            <h2 className="text-xl font-semibold">Existing Reservations</h2>
            <div className="reservation-list">
                {reservations.length === 0 ? (
                    <p>No reservations found</p>
                ) : (
                    <div className="space-y-4">
                        {reservations.map((reservation) => (
                            <ReservationCard key={reservation._id} reservation={reservation} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationPage;
