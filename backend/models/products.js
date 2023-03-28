const fs = require('fs');
const path = require('path');

const productsDataPath = path.join(
    path.dirname(
        require.main.filename),
        'data',
        'products.json'
    );

const getProductsFromFile = callback => {
    fs.readFile(productsDataPath, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback.JSON.parse(fileContent);
        }
    });
}

module.exports = class Product {
    constructor(id, name, ownerName, developers, scrumMasterName, startDate, methodology) {
        this.productId = id;
        this.productName = name;
        this.productOwnerName = ownerName;
        this.developers = developers;
        this.scrumMasterName = scrumMasterName;
        this.startDate = startDate;
        this.methodology = methodology;
    };

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(productsDataPath, JSON.stringify(products), err => {
                console.log(err);
            });
        })
    };

    static updateProductById(id, attributes) {
        getProductsFromFile(products => {
            const updateKeys = Object.keys(attributes);
            if (!updateKeys.length) {
                throw new Error('At least one attribute must be updated');
            }
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                throw new Error('Product with ID ' + id + ' not found');
            }
            //updating product with new attributes
            products[productIndex] = {
                ...products[productIndex],
                ...attributes
            };
            fs.writeFile(productsDataPath, JSON.stringify(products), err => {
                console.log(err);
              });
        });
    }

    static getProductById(id) {
        getProductsFromFile(products => {
            //search for products and check if the product id matches
            products.map(product => {
                if (product.productId === id) {
                    return product;
                };
            });
            throw new Error('No product with ID' + id + 'exists.');
        });
    };

    static fetchAll(callback) {
        getProductsFromFile(callback);
    };
}