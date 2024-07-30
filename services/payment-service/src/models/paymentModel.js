const { pool } = require('../db');

const createPayment = async (payment) => {
  const { userId, amount, status } = payment;
  const result = await pool.query(
    'INSERT INTO payments (user_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
    [userId, amount, status]
  );
  return result.rows[0];
};

const getPayments = async () => {
  const result = await pool.query('SELECT * FROM payments');
  return result.rows;
};

module.exports = { createPayment };
