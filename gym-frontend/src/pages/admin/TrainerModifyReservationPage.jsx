import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';

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
        <div className="trainer-modify-reservation-page flex min-h-screen bg-gray-900">
            <AdminNavbar /> {/* Add the AdminNavbar on the left side */}

            <div className="flex-1 p-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Modify Reservation</h2>
                <form onSubmit={handleUpdateStatus} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                    <p className="text-white">Session: {reservation.sessionName}</p>
                    <p className="text-white">Trainer: {reservation.trainerName}</p>
                    <label className="text-white">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="">Select Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Update Status
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TrainerModifyReservationPage;
