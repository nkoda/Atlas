const express = require('express');
// const { body } = require('express-validator/check');

const healthController = require('../controllers/health');
const productController = require('../controllers/products');

const router = express.Router();

router.get('/health', healthController.getHealth);

//GET request to get all products
router.get('/', productController.getAllProducts);

//POST request to create new product on the server
router.post('/', productController.createProduct);

//GET request for a specific product using ProductID
router.get('/:id', productController.getProductsById); 

//PUT request to update a specific product using ProductID
router.put('/:id', productController.updateProduct);

//DELETE request to delete a specific product using ProductID
router.delete('/id', productController.deleteProduct);

module.exports = router;