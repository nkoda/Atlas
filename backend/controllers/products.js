const fs = require('fs');
const path = require('path');

const Product = require('../models/products');

//GET request to get all products
exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.status(200).json(products)
    });
}

//POST request to create new product on the server
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
//GET request to find product by ProductID
exports.getProductsById = (req, res, next) => {
    const product = Product.updateProductById(req.params.id);
    res.status(200).json(stringfify(product));
}
//PUT request to update new product
exports.updateProduct = (req, res, next) => {
    const productId = req.params.id
    try {
        Product.updateProductById(productId, req.query);
        res.status(201).json({message:'201: Success'});
    } catch (err) {
        res.status(404).json({message: err.stringify});
    }
}

exports.deleteProduct = (req, res, next) => {
    //TODO
    // go through the data and delete the products
}