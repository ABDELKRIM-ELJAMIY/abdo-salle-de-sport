const express = require('express');
const router = express.Router();
const { reserveSession, getMyReservations } = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/:sessionId', reserveSession);
router.get('/my-reservations', getMyReservations);

module.exports = router;
