const express = require('express');
const { createNewBooking, getUserBookings, getBookingDetails, cancelUserBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createNewBooking);
router.get('/user/:userId', getUserBookings);

router.get('/:hotel_id', getBookingDetails);
router.delete('/:id', cancelUserBooking);

module.exports = router;
