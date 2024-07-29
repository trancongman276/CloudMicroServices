const express = require('express');
const { createNewHotel, getAllHotels, getHotelDetails, updateHotelDetails, deleteHotelById } = require('../controllers/hotelController');
const { authMiddleware, isManagerOrAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, isManagerOrAdmin, createNewHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotelDetails);
router.put('/:id', authMiddleware, isManagerOrAdmin, updateHotelDetails);
router.delete('/:id', authMiddleware, isManagerOrAdmin, deleteHotelById);

module.exports = router;
