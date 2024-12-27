const { adminData } = require("../config/config");

// Controlador para manejar la autenticación
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === adminData.username && password === adminData.password) {
            return res.status(200).json({
                message: "Inicio de sesión exitoso",
                status: "success",
            });
        }

        return res.status(401).json({
            message: "Usuario o contraseña incorrectos, intente de nuevo",
            status: "error",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

module.exports = { login };
