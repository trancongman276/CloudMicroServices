const express = require('express');
const { createNewRating, getHotelRatings, getRatingByUser, updateRatingDetails, deleteRatingById } = require('../controllers/ratingController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// User
router.post('/', authMiddleware, createNewRating);
router.get('/:uid', authMiddleware, getRatingByUser);
router.put('/:id', authMiddleware, updateRatingDetails);
router.delete('/:id', authMiddleware, deleteRatingById);

router.get('/hotel/:hotelId', getHotelRatings);

module.exports = router;
