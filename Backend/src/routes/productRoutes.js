const express = require("express");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");

const router = express.Router();
//endpoint para agregar productos
router.post("/store/products", addProduct);
//endpoint para obtener los productos
router.get("/store/products", getProducts);
// Endpoint para eliminar un producto
router.delete("/store/products/:id", deleteProduct);
module.exports = router;
