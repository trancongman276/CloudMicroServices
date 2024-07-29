const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModel');
const {createManager} = require('../models/managerModel');
const config = require('../config');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, password: hashedPassword, role });
    if (req.body.role === 'manager' && req.body.hotelId) {
      await createManager({ userId: user.id, hotelId: req.body.hotelId });
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  // Client-side token handling logic
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { register, login, logout };
