const { pool } = require('../db');

const createBooking = async (booking) => {
  const { userId, hotelId, checkInDate, checkOutDate, status } = booking;
  const result = await pool.query(
    'INSERT INTO bookings (user_id, hotel_id, check_in_date, check_out_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [userId, hotelId, checkInDate, checkOutDate, status]
  );
  return result.rows[0];
};

const getBookingsByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [userId]);
  return result.rows;
};

const getBookingByHotelId = async (hotelId) => {
  const result = await pool.query('SELECT * FROM bookings WHERE hotel_id = $1', [hotelId]);
  return result.rows;
}

const getBookingById = async (id) => {
  const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
  return result.rows[0];
};

const cancelBooking = async (id) => {
  const result = await pool.query('UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *', ['cancelled', id]);
  return result.rows[0];
};

module.exports = { createBooking, getBookingsByUserId, getBookingById, cancelBooking, getBookingByHotelId };
