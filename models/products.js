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


module.exports = class Product {
    constructor(id, name, ownerName, developers, scrumMaster, startDate, methodology) {
        this.id = id
        this.name = name
        this.ownerName = ownerName
        this.developers = developers
        this.scrumMaster = scrumMaster
        this.startDate = startDate
        this.methodology = methodology
    }

}