const { findUserById, findAllUsers } = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const result = await findAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await findUserById(id);
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, getUserById };
