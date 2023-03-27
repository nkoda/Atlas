const fs = require('fs');
const path = require('path');

const Product = require('../models/products');

exports.getAllProducts = (req, res, next) => {
    //TODO
    // Retrieve all the products
}

exports.createProduct = (req, res, next) => {
    //TODO
    // create a new product and add to the data
}

exports.getProductsById = (req, res, next) => {
    //TODO
    //search for products based on the ID
}

exports.updateProduct = (req, res, next) => {
    //TODO
    // update a given product by the id
}

exports.deleteProduct = (req, res, next) => {
    //TODO
    // go through the data and delete the products
}