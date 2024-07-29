const { createBooking, getBookingsByUserId, getBookingByHotelId, cancelBooking } = require('../models/bookingModel');

// User's scope
const createNewBooking = async (req, res) => {
  const { userId, hotelId, checkInDate, checkOutDate } = req.body;
  try {
    const newBooking = await createBooking({ userId, hotelId, checkInDate, checkOutDate, status: 'confirmed' });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await getBookingsByUserId(userId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manager's scope
const getBookingDetails = async (req, res) => {
  const { hotel_id } = req.params;
  try {
    const booking = await getBookingByHotelId(hotel_id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelUserBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const cancelledBooking = await cancelBooking(id);
    if (!cancelledBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(cancelledBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewBooking, getUserBookings, getBookingDetails, cancelUserBooking };
