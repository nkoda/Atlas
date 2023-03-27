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

    static fetchAll(callback) {
        getProductsFromFile(callback);
    };
}