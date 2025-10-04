const asyncHandler = require('express-async-handler');
const Leave = require('../models/LeaveRequest');

const applyLeave = asyncHandler(async (req, res) => {
  const { type, startDate, endDate, reason } = req.body;
  if (!startDate || !endDate) { res.status(400); throw new Error('Provide dates'); }
  const s = new Date(startDate), e = new Date(endDate);
  if (s > e) { res.status(400); throw new Error('startDate must be <= endDate'); }

  // Optional overlap check
  const overlap = await Leave.findOne({
    employee: req.user._id,
    status: { $in: ['pending','approved'] },
    $or: [
      { startDate: { $lte: e }, endDate: { $gte: s } }
    ]
  });
  if (overlap) { res.status(400); throw new Error('Overlapping leave exists'); }

  const leave = await Leave.create({ employee: req.user._id, type, startDate: s, endDate: e, reason });
  res.status(201).json(leave);
});

const getMyLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({ employee: req.user._id }).populate('approver','name email').sort({ createdAt: -1 });
  res.json(leaves);
});

const getLeaveById = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id).populate('approver','name email').populate('employee','name email');
  if (!leave) { res.status(404); throw new Error('Leave not found'); }
  if (req.user.role !== 'admin' && leave.employee._id.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Forbidden'); }
  res.json(leave);
});

const cancelLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) { res.status(404); throw new Error('Not found'); }
  if (leave.employee.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Forbidden'); }
  if (leave.status !== 'pending') { res.status(400); throw new Error('Only pending can be cancelled'); }
  leave.status = 'cancelled';
  await leave.save();
  res.json({ message: 'Cancelled' });
});

module.exports = { applyLeave, getMyLeaves, getLeaveById, cancelLeave };
