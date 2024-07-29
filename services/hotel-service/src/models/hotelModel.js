const { pool } = require('../db');

const createHotel = async (hotel) => {
  const { name, address, city, country, stars, description } = hotel;
  const result = await pool.query(
    'INSERT INTO hotels (name, address, city, country, stars, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, address, city, country, stars, description]
  );
  return result.rows[0];
};

const getHotels = async () => {
  const result = await pool.query('SELECT * FROM hotels');
  return result.rows;
};

const getHotelById = async (id) => {
  const result = await pool.query('SELECT * FROM hotels WHERE id = $1', [id]);
  return result.rows[0];
};

const updateHotel = async (id, hotel) => {
  const { name, address, city, country, stars, description } = hotel;
  const result = await pool.query(
    'UPDATE hotels SET name = $1, address = $2, city = $3, country = $4, stars = $5, description = $6 WHERE id = $7 RETURNING *',
    [name, address, city, country, stars, description, id]
  );
  return result.rows[0];
};

const deleteHotel = async (id) => {
  const result = await pool.query('DELETE FROM hotels WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

// Room
const createRoomType = async (roomType) => {
  const { hotelId, type, price } = roomType;
  const result = await pool.query(
    'INSERT INTO room_types (hotel_id, type, price) VALUES ($1, $2, $3) RETURNING *',
    [hotelId, type, price]
  );
  return result.rows[0];
};

const getRoomTypesByHotelId = async (hotelId) => {
  const result = await pool.query('SELECT * FROM room_types WHERE hotel_id = $1', [hotelId]);
  return result.rows;
};

const createRoom = async (room) => {
  const { hotelId, roomTypeId, number } = room;
  const result = await pool.query(
    'INSERT INTO rooms (hotel_id, room_type_id, number) VALUES ($1, $2, $3) RETURNING *',
    [hotelId, roomTypeId, number]
  );
  return result.rows[0];
};

const getRoomsByHotelId = async (hotelId) => {
  const result = await pool.query('SELECT * FROM rooms WHERE hotel_id = $1', [hotelId]);
  return result.rows;
};

const lockRoom = async (roomId) => {
  const result = await pool.query(
    'UPDATE rooms SET status = $1 WHERE id = $2 AND status = $3 RETURNING *',
    ['locked', roomId, 'available']
  );
  return result.rows[0];
};

const unlockRoom = async (roomId) => {
  const result = await pool.query(
    'UPDATE rooms SET status = $1 WHERE id = $2 AND status = $3 RETURNING *',
    ['available', roomId, 'locked']
  );
  return result.rows[0];
};

module.exports = { 
  createHotel, 
  getHotels, 
  getHotelById, 
  updateHotel, 
  deleteHotel, 
  createRoomType, 
  getRoomTypesByHotelId,
  createRoom,
  getRoomsByHotelId,
  lockRoom, 
  unlockRoom
};
