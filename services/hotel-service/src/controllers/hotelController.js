const { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } = require('../models/hotelModel');

const createNewHotel = async (req, res) => {
  try {
    const newHotel = await createHotel(req.body);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHotelDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await getHotelById(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHotelDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedHotel = await updateHotel(id, req.body);
    if (!updatedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHotel = await deleteHotel(id);
    if (!deletedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.status(200).json(deletedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Room
const addRoomType = async (req, res) => {
  try {
    const roomType = await createRoomType(req.body);
    res.status(201).json(roomType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoomTypes = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const roomTypes = await getRoomTypesByHotelId(hotelId);
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addRoom = async (req, res) => {
  try {
    const room = await createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRooms = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const rooms = await getRoomsByHotelId(hotelId);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bookRoom = async (req, res) => {
  const { roomId, userId, amount } = req.body;
  try {
    const lockedRoom = await lockRoom(roomId);
    if (!lockedRoom) {
      return res.status(400).json({ error: 'Room is not available.' });
    }
    const payment = await createPayment({ userId, amount, status: 'completed' });
    res.status(200).json({ message: 'Booking successful', payment });
  } catch (error) {
    await unlockRoom(roomId);  // Ensure the room is unlocked in case of an error
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createNewHotel, 
  getAllHotels, 
  getHotelDetails, 
  updateHotelDetails, 
  deleteHotelById,
  addRoomType,
  getRoomTypes,
  addRoom,
  getRooms,
  bookRoom
};
