const fs = require('fs');
const path = require('path');

const Product = require('../models/products');

/**
 * GET request to get all products
 */
exports.getAllProducts = (req, res, next) => {
    console.log('getting products')
    Product.fetchAll(product =>
        res.status(200).json(product));
}

/**
 * POST request to create new product on the server
 */
exports.createProduct = async (req, res, next) => {
    const {
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology
      } = req.body;
    const product = new Product(
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology
    );
    product.save();
    res.status(200).send('data recieved');
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
    const id = req.params.id;
    try {
        const attributes = {
            productName,
            productOwnerName,
            developers,
            scrumMasterName,
            startDate,
            methodology
          } = req.body;

        Product.updateProductById(id, attributes, () => {
            res.status(200).json({message:'201: Success'});
        });

    } catch (err) {
        res.status(404).json({message:"Update not successful"});
    }
}


/**
 * DELETE request to delete a product with the specified ID from the JSON file
 */
exports.deleteProduct = (req, res, next) => {
    const productId = req.params.id;
    Product.deleteProductById(productId, (err) => {
        if (err) {
            res.status(400).send({message:'Deletion failed'});
        } else {
            res.status(204).send({message: 'Successfully deleted'});
        }
    });
}