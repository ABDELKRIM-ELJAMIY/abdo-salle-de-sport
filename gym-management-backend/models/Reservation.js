const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
