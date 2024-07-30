const express = require('express');
const {
  pay, getPayments
} = require("../controllers/paymentController")
const {
  authMiddleware
} = require("../middleware/auth")
const router = express.Router();

router.post('/pay', authMiddleware, pay);
router.get('/pay', authMiddleware, getPayments);

module.exports = router;