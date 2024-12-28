let nextProductId = 1;
const products = []; // Base de datos simulada para productos

const addProduct = (req, res) => {
  const { name, price, stock } = req.body;

  // Validaciones
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "Error en los datos del producto: el nombre es requerido",
      status: "error",  
    });
  }

  if (!price || typeof price !== "number" || price < 0) {
    return res.status(400).json({
      message: "Error en los datos del producto: el precio debe ser mayor que 0",
      status: "error",
    });
  }

  if (stock === undefined || typeof stock !== "number" || stock <=0) {
    return res.status(400).json({
      message: "Error en los datos del producto: el stock debe ser mayor  a 0",
      status: "error",
    });
  }

  // Validar duplicados por nombre
  if (products.some((p) => p.name === name)) {
    return res.status(400).json({
      message: "Error en los datos del producto: el nombre del producto ya existe",
      status: "error",
    });
  }

  // Generar ID autoincremental
  const id = nextProductId++;

  products.push({ id, name, price, stock });
  return res.status(200).json({
    message: "Producto agregado exitosamente",
    status: "success",
    product: { id, name, price, stock },
  });
};

const getProducts = (req, res) => {
  return res.status(200).json(products);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex((product) => product.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({
      message: "Producto no encontrado",
      status: "error",
    });
  }

  products.splice(index, 1);

  // Reiniciar ID si todos los productos son eliminados (opcional)
  if (products.length === 0) {
    nextProductId = 1;
  }

  return res.status(200).json({
    message: "Producto eliminado exitosamente",
    status: "success",
  });
};

module.exports = { addProduct, getProducts, deleteProduct };
