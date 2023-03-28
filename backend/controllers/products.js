const fs = require('fs');
const path = require('path');

const Product = require('../models/products');

/**
 * GET request to get all products
 */
exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.status(200).json(products)
    });
}

/**
 * POST request to create new product on the server
 */
exports.createProduct = (req, res, next) => {
    const {
        productId,
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology
      } = req.query;

      const product = new Product({
        productId,
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology
      });

    product.save()
    res.status(201).json(JSON.stringify(product));

}

/**
 * GET request to find product by ProductID
 */
exports.getProductsById = (req, res, next) => {
    Product.getProductById(req.params.id, product => {
        if (product) {
            res.status(200).json(JSON.stringify(product));
        } else {
            res.status(404).json({message: 'Error, Could not find product.'});
        }
    });
}

/**
 * PUT request to update a product with the specified ID with the provided attributes
 */
exports.updateProduct = (req, res, next) => {
    const productId = req.params.id;
    try {
        Product.updateProductById(productId, req.query);
        res.status(200).json({message:'201: Success'});
    } catch (err) {
        res.status(404).json({message: err.stringify});
    }
}

/**
 * DELETE request to delete a product with the specified ID from the JSON file
 */
exports.deleteProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.deleteProduct(productId, () => {
        res.status(204);
    });
}