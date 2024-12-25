const { adminData } = require("../config/config");

// Controlador para el login
//controlador para administrar el login
module.exports.login = async (req, res) => {
    try {
      if (
        req.body.username === adminData.username &&
        req.body.password === adminData.password
      ) {
        res.status(200).json({
          message: "login exitoso",
          //body: req.body,
          status:"success"
        });
      } else {
        res.status(401).json({
          message: "Usuario o contraseña incorrectos, intente de nuevo",
           status:"error"
          //body: req.body,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

