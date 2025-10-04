const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves, getLeaveById, cancelLeave } = require('../controllers/leaveController');
const { protect } = require('../middleware/auth');

router.post('/', protect, applyLeave);
router.get('/mine', protect, getMyLeaves);
router.get('/:id', protect, getLeaveById);
router.patch('/:id/cancel', protect, cancelLeave);

module.exports = router;