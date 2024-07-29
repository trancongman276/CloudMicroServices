const { pool } = require('../db');

const createUser = async (user) => {
  const { username, password, role } = user;
  const result = await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
    [username, password, role]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT id, username, role FROM users WHERE id = $1', [id]);
  return result.rows;
}

const findAllUsers = async () => {
  const result = await pool.query('SELECT id, username, role FROM users');
  return result.rows;
}
module.exports = { createUser, findUserByUsername, findUserById, findAllUsers };
