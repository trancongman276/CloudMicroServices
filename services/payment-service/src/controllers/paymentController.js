const { createPayment } = require('../models/paymentModel');

const pay = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const payment = await createPayment({ userId, amount, status: 'completed' });
    res.status(200).json({ message: 'Payment successful', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { pay };
