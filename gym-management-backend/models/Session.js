const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    availableSlots: { type: Number, required: true },
});

module.exports = mongoose.model('Session', SessionSchema);
