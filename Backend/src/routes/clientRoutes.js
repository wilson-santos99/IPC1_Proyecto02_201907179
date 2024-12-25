const express = require("express");
const { addClient, getClients,deleteClient  } = require("../controllers/clientController");

const router = express.Router();

router.post("/store/clients", addClient);
router.get("/store/clients", getClients);
// Endpoint para eliminar un cliente
router.delete("/store/clients/:id", deleteClient);
module.exports = router;
