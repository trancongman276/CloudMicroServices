const { findAllManagers, findManagerByUserId, findManagersByHotelId } = require('../models/managerModel');

const getAllManagers = async (req, res) => {
  try {
    const result = await findAllManagers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getManagerByUId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await findManagerByUserId(id);
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getManagersByHId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await findManagersByHotelId(id);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Hotel not found' });
          }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById };
