const express = require('express');
const {
  pay
} = require("../controllers/paymentController")
const {
  authMiddleware
} = require("../middleware/auth")
const router = express.Router();

router.post('/pay', authMiddleware, pay);

module.exports = router;