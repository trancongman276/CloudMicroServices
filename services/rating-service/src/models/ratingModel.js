const { pool } = require('../db');

const createRating = async (rating) => {
  const { userId, hotelId, ratingValue, review } = rating;
  console.log(userId, hotelId, ratingValue, review);
  const result = await pool.query(
    'INSERT INTO ratings (user_id, hotel_id, rating_value, review) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, hotelId, ratingValue, review]
  );
  return result.rows[0];
};

const getRatingsByHotelId = async (hotelId) => {
  const result = await pool.query('SELECT * FROM ratings WHERE hotel_id = $1', [hotelId]);
  return result.rows;
};

const getRatingByUId = async (UId) => {
  const result = await pool.query('SELECT * FROM ratings WHERE user_id = $1', [UId]);
  return result.rows;
}

const getRatingById = async (id) => {
  const result = await pool.query('SELECT * FROM ratings WHERE id = $1', [id]);
  return result.rows[0];
};

const updateRating = async (id, rating) => {
  const { ratingValue, review } = rating;
  const result = await pool.query(
    'UPDATE ratings SET rating_value = $1, review = $2 WHERE id = $3 RETURNING *',
    [ratingValue, review, id]
  );
  return result.rows[0];
};

const deleteRating = async (id) => {
  const result = await pool.query('DELETE FROM ratings WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { createRating, getRatingsByHotelId, getRatingById, getRatingByUId, updateRating, deleteRating };
