const express = require("express");
const cors = require("cors");
const { server } = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use(authRoutes);
app.use(productRoutes);
app.use(clientRoutes);

// Rutas inválidas
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

app.listen(server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${server.port}`);
});
