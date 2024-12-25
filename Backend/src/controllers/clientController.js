let nextId = 1;
const clients = []; // Base de datos simulada

const addClient = (req, res) => {
  const { name, age, nit } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "Error en los datos del cliente: el nombre es requerido",
      status: "error",
    });
  }

  if (!age || typeof age !== "number" || age <= 0) {
    return res.status(400).json({
      message: "Error en los datos del cliente: la edad debe ser mayor que 0 y numérica",
      status: "error",
    });
  }

  const id = nextId++; // Generar ID autoincremental

  clients.push({ id, name, age, nit: nit || "C/F" });
  return res.status(200).json({
    message: "Cliente agregado exitosamente",
    status: "success",
    client: { id, name, age, nit: nit || "C/F" },
  });
};

const getClients = (req, res) => {
  return res.status(200).json(clients);
};

const deleteClient = (req, res) => {
  const { id } = req.params;

  const index = clients.findIndex((client) => client.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({
      message: "Cliente no encontrado",
      status: "error",
    });
  }

  clients.splice(index, 1);

  // Reiniciar ID si todos los clientes son eliminados
  if (clients.length === 0) {
    nextId = 1;
  }

  return res.status(200).json({
    message: "Cliente eliminado exitosamente",
    status: "success",
  });
};

module.exports = { addClient, getClients, deleteClient };
