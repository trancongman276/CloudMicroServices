const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const bookingRoutes = require('./routes/bookingRoutes');
const { pool } = require('./db');

const app = express();
app.use(express.json());

app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Booking service running on port ${PORT}`);
});
