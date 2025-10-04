const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['annual','sick','casual','other'], default: 'annual' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['pending','approved','rejected','cancelled'], default: 'pending' },
  approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveSchema);
