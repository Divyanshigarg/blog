const { registerUser, login } = require("../controllers/userController");
const express = require('express')
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',login)

module.exports = router;