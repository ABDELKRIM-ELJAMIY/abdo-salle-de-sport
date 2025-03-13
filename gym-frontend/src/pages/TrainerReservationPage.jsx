import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationCard from '../components/ReservationCard';

const TrainerReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/reservations/trainer');
                console.log('Reservations data:', response.data); // Log pour vérifier la réponse de l'API
                // Vérifie si la réponse est un tableau
                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                } else if (response.data.reservations && Array.isArray(response.data.reservations)) {
                    setReservations(response.data.reservations);  // Si les réservations sont dans un objet
                } else {
                    console.error('Les réservations ne sont pas dans un tableau.');
                }
            } catch (err) {
                console.error('Erreur lors de la récupération des réservations:', err);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Trainer Reservations</h2>
            {/* Vérifie que reservations est un tableau avant de map */}
            {Array.isArray(reservations) && reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <ReservationCard key={reservation._id} reservation={reservation} />
                ))
            ) : (
                <p>Aucune réservation trouvée.</p> // Message si aucune réservation disponible
            )}
        </div>
    );
};

export default TrainerReservationPage;
