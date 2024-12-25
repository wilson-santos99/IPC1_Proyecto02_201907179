const express = require("express");
const { login } = require("../controllers/loginController");

const router = express.Router();

// Ruta para el login
router.post("/store/login", login);

module.exports = router;
