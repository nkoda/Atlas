const express = require('express');

const healthController = require('../controllers/health');
const productController = require('../controllers/products');

const router = express.Router();

router.get('/health', healthController.getHealth);

router.get(productController.getAllProducts);
router.post(productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/id', productController.deleteProduct);

module.exports = router;