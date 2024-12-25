const { adminData } = require("../config/config");

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === adminData.username && password === adminData.password) {
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      status: "success",
    });
  }

  return res.status(401).json({
    message: "Usuario o contraseña incorrectos",
    status: "error",
  });
};

module.exports = { login };
