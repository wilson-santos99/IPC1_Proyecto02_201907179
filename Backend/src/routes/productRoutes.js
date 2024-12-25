const express = require("express");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/store/products", addProduct);
router.get("/store/products", getProducts);
// Endpoint para eliminar un producto
router.delete("/store/products/:id", deleteProduct);
module.exports = router;
