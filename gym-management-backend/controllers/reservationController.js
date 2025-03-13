const Session = require('../models/Session');
const Reservation = require('../models/Reservation');

// Réserver une session
const reserveSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.sessionId);
        if (!session) return res.status(404).json({ message: 'Session non trouvée' });

        if (session.availableSlots <= 0) {
            return res.status(400).json({ message: 'Aucune place disponible pour cette session' });
        }

        const reservation = new Reservation({
            user: req.user.id,
            session: session._id,
            startDate: session.startDate,
            endDate: session.endDate,
        });

        await reservation.save();

        session.availableSlots -= 1;
        await session.save();

        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la réservation', error: err });
    }
};

// Obtenir les réservations d'un utilisateur
const getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id }).populate('session');
        res.status(200).json(reservations);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération des réservations', error: err });
    }
};

module.exports = { reserveSession, getMyReservations };
