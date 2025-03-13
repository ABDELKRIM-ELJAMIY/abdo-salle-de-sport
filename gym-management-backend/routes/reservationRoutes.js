// reservationRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Fetch and return reservations from DB
    res.json([/* array of reservations */]);
});

router.post('/', (req, res) => {
    // Create a new reservation
    const newReservation = req.body;
    // Save it to the database
    res.status(201).json(newReservation);
});

module.exports = router;
