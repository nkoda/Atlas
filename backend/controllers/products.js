const fs = require('fs');
const path = require('path');

const Product = require('../models/products');

exports.getAllProducts = (req, res, next) => {
    //TODO
    // Retrieve all the products
    // Product.fetchAll()
    res.status(200).json({
        productId: 2000,
        productName: "Project TTEST",
        productOwnerName: "William Perez",
        Developers: [
            "Grace Lee",
            "Michael Garcia",
            "Victoria Johnson",
            "Evan Smith",
            "Audrey Davis"
        ],
        scrumMasterName: "Nicholas Kim",
        startDate: "2022/11/01",
        methodology: "XP"
    });
}

//POST request to create new product on the server
exports.createProduct = (req, res, next) => {
    const id = req.params.id
    const name = req.query.productName
    const ownerName = req.query.productOwnerName;
    const developers = req.query.developers;
    const scrumMasterName = req.query.scrumMasterName;
    const startDate = req.query.startDate;
    const methodology = req.query.methodology;

    const product = new Product(id, name, ownerName, developers, scrumMasterName, startDate, methodology);
    product.save()
    res.status(201).json(JSON.stringify(product));

}

exports.getProductsById = (req, res, next) => {
    //TODO
    //search for products based on the ID
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