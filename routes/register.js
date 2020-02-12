const express = require('express');
const router = express.Router();
const controller = require('../controllers/registercontroller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.guest, controller.register);

module.exports = router;
