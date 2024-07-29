const express = require('express');
const { getUsers, getUserById } = require('../controllers/userController');
const { roleMiddleware, verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, roleMiddleware('admin'), getUsers);
router.get('/:id', verifyToken, roleMiddleware('admin'), getUserById);

module.exports = router;
