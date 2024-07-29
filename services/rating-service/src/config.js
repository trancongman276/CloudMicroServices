module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  db: {
    user: process.env.DB_USER || 'user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'user_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  },
};
