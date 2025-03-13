const express = require('express');
const router = express.Router();
const { createSession, getAllSessions, deleteSession } = require('../controllers/sessionController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Créer une session (accessible seulement aux entraîneurs)
router.post('/', verifyToken, verifyRole('trainer'), createSession);

// Obtenir toutes les sessions
router.get('/', getAllSessions);

// Supprimer une session (accessible seulement aux entraîneurs)
router.delete('/:id', verifyToken, verifyRole('trainer'), deleteSession);

module.exports = router;
