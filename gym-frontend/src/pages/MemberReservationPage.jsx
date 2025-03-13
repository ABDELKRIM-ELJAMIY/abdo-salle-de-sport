import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../components/Calendar';
import ReservationCard from '../components/ReservationCard';

const MemberReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Fetch reservations on page load or selectedDate change
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservations');
                if (Array.isArray(response.data)) {
                    setReservations(response.data); // Update reservations if the response is an array
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchReservations();
    }, [selectedDate]);

    // Handle reservation form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newReservation = {
                date: selectedDate,
                time,
                description,
            };

            // POST to backend
            await axios.post('http://localhost:8000/api/reservations', newReservation);

            // Reload reservations after adding a new one
            const response = await axios.get('http://localhost:8000/api/reservations');
            if (Array.isArray(response.data)) {
                setReservations(response.data); // Update reservations if the response is an array
            }

            setTime('');
            setDescription('');
        } catch (err) {
            console.error(err);
            setError('Failed to create reservation');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Member Reservations</h2>
            <Calendar onSelectDate={setSelectedDate} />
            <form onSubmit={handleSubmit} className="my-4">
                <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded-lg text-white">
                    Add Reservation
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
            <div>
                {reservations.map((reservation) => (
                    <ReservationCard
                        key={reservation._id}
                        reservation={reservation}
                    />
                ))}
            </div>
        </div>
    );
};

export default MemberReservationPage;
