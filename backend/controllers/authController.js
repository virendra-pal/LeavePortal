const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) { res.status(400); throw new Error('Missing fields'); }
  const exists = await User.findOne({ email });
  if (exists) { res.status(400); throw new Error('User exists'); }
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } else {
    res.status(401); throw new Error('Invalid credentials');
  }
});

const getProfile = asyncHandler(async (req, res) => {
  res.json({ _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role });
});

module.exports = { registerUser, authUser, getProfile };
