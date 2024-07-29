const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const ratingRoutes = require('./routes/ratingRoutes');
const { pool } = require('./db');
const { errorHandler } = require('./middleware/errorHandler');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api/ratings', ratingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Rating service running on port ${PORT}`);
});
