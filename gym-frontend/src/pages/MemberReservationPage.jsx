import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationCard from '../components/ReservationCard';
import Calendar from '../components/Calendar';

const MemberReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/reservations');
                setReservations(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReservations();
    }, [selectedDate]);

    const handleReservation = (reservationId) => {
        // Handle reservation action here
        console.log(`Reservation ID: ${reservationId}`);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Member Reservations</h2>
            <Calendar onSelectDate={setSelectedDate} />
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation._id}
                    reservation={reservation}
                    onClick={() => handleReservation(reservation._id)}
                />
            ))}
        </div>
    );
};

export default MemberReservationPage;
