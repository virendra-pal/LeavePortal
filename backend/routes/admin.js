const express = require('express');
const router = express.Router();
const { getAllLeaves, approveLeave, rejectLeave } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/leaves', protect, admin, getAllLeaves);
router.patch('/leaves/:id/approve', protect, admin, approveLeave);
router.patch('/leaves/:id/reject', protect, admin, rejectLeave);

module.exports = router;