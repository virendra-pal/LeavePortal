const asyncHandler = require("express-async-handler");
const Leave = require("../models/LeaveRequest");

const getAllLeaves = asyncHandler(async (req, res) => {
  const { status, employee } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (employee) filter.employee = employee;
  const leaves = await Leave.find(filter)
    .populate("employee", "name email")
    .populate("approver", "name email")
    .sort({ createdAt: -1 });
  res.json(leaves);
});

const approveLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    res.status(404);
    throw new Error("Leave not found");
  }
  if (leave.status !== "pending") {
    res.status(400);
    throw new Error("Only pending can be approved");
  }
  leave.status = "approved";
  leave.approver = req.user._id;
  if (req.body && req.body.comment) {
    leave.comment = req.body.comment;
  }
  await leave.save();
  res.json(leave);
});

const rejectLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    res.status(404);
    throw new Error("Leave not found");
  }
  if (leave.status !== "pending") {
    res.status(400);
    throw new Error("Only pending can be rejected");
  }
  leave.status = "rejected";
  leave.approver = req.user._id;
  if (req.body && req.body.comment) {
    leave.comment = req.body.comment;
  }
  await leave.save();
  res.json(leave);
});

module.exports = { getAllLeaves, approveLeave, rejectLeave };
