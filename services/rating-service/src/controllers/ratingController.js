const { createRating, getRatingsByHotelId, getRatingById, getRatingByUId, updateRating, deleteRating } = require('../models/ratingModel');

const createNewRating = async (req, res) => {
  try {
    const newRating = await createRating(req.body);
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHotelRatings = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const ratings = await getRatingsByHotelId(hotelId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatingByUser = async (req, res) => {
  const {uid} = req.params;
  try{
    const rating = await getRatingByUId(uid);
    if (!rating){
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatingDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await getRatingById(id);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRatingDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRating = await updateRating(id, req.body);
    if (!updatedRating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRatingById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRating = await deleteRating(id);
    if (!deletedRating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.status(200).json(deletedRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewRating, getHotelRatings, getRatingDetails, getRatingByUser, updateRatingDetails, deleteRatingById };
