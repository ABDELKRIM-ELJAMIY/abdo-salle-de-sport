import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TrainerModifyReservationPage = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(`/reservations/${id}`);
                setReservation(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReservation();
    }, [id]);

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/reservations/${id}`, { status });
            alert('Reservation updated successfully');
        } catch (err) {
            console.error(err);
        }
    };

    if (!reservation) return <div>Loading...</div>;

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Modify Reservation</h2>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
                <p>Session: {reservation.sessionName}</p>
                <p>Trainer: {reservation.trainerName}</p>
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Update Status</button>
            </form>
        </div>
    );
};

export default TrainerModifyReservationPage;
