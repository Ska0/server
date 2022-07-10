const express = require('express');
const router = express.Router();
const { createJournal, getJournals, updateJournal, deleteJournal } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getJournals).post(protect, createJournal);
router.route('/:id').put(protect, updateJournal).delete(protect, deleteJournal);

module.exports = router;