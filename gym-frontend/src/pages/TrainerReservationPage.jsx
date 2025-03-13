import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationCard from '../components/ReservationCard';

const TrainerReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/reservations/trainer');
                setReservations(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Trainer Reservations</h2>
            {reservations.map((reservation) => (
                <ReservationCard key={reservation._id} reservation={reservation} />
            ))}
        </div>
    );
};

export default TrainerReservationPage;
