import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationCard from '../components/ReservationCard';
import Calendar from '../components/Calendar';

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]); // Ensure it's an array
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/reservations');

                // Ensure the response data is an array
                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setReservations([]); // Fallback to empty array
                }
            } catch (err) {
                console.error('Error fetching reservations:', err);
                setError('Failed to fetch reservations.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [selectedDate]);

    const handleReservation = async (reservationId) => {
        try {
            await axios.post(`/reservations/book/${reservationId}`);
            alert('✅ Reservation successful!');
        } catch (err) {
            alert('❌ Error booking reservation');
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Available Reservations</h2>

            {/* Calendar Component */}
            <div className="flex justify-center mb-6">
                <Calendar onSelectDate={setSelectedDate} />
            </div>

            {/* Loading & Error Handling */}
            {loading ? (
                <p className="text-center text-gray-500">Loading reservations...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : reservations.length === 0 ? (
                <p className="text-center text-gray-500">No available reservations for this date.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reservations?.map((reservation) => (
                        <ReservationCard
                            key={reservation._id}
                            reservation={reservation}
                            onClick={() => handleReservation(reservation._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationPage;
