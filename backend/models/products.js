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

const getProductById = (productId, products) => {
    products.map(product => {
        if (product.productId === productId) {
          return updatedProduct;
        }
        return product;
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

    update(attributes) {
        const updateKeys = Object.keys(attributes);

        if (!updateKeys.length) {
            throw new Error('At least one attribute must be updated');
        }
        //override existing class attributes with new attributes
        const updatedProduct = {
            ...this,
            ...attributes
        };
        //write update to disk
        getProductsFromFile(products => {
            const updatedProducts = getProductById(this.productId, products);
            fs.writeFile(productsDataPath, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
        });
    };

    static updateProductById(id, attributes) {
        getProductsFromFile(products => {
            const updateKeys = Object.keys(attributes);
            if (!updateKeys.length) {
                throw new Error('At least one attribute must be updated');
            }
            product = getProductById(id, products)
            const updatedProduct = {
                ...product,
                ...attributes
            };
            fs.writeFile(productsDataPath, JSON.stringify(updatedProducts), err => {
                console.log(err);
              });

        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    };
}