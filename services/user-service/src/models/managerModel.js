const { pool } = require('../db');

const createManager = async (manager) => {
  const { userId, hotelId } = manager;
  const result = await pool.query(
    'INSERT INTO managers (user_id, hotel_id) VALUES ($1, $2) RETURNING *',
    [userId, hotelId]
  );
  return result.rows[0];
};

const findAllManagers = async () => {
  const result = await pool.query('SELECT * FROM managers');
  return result.rows;
};

const findManagerByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM managers WHERE user_id = $1', [userId]);
  return result.rows[0];
};

const findManagersByHotelId = async (hotelId) => {
  const result = await pool.query('SELECT * FROM managers WHERE hotel_id = $1', [hotelId]);
  return result.rows;
};

module.exports = { createManager, findAllManagers, findManagerByUserId, findManagersByHotelId };
