/**
@description This module provides the Product class, which represents a product with several properties
@module Product
*/

const fs = require('fs');
const path = require('path');

//Path to products data file
const productsDataPath = path.join(
    path.dirname(
        require.main.filename),
        'data',
        'products.json'
    );

/**
@function
@description Reads data from products file
@param {function} callback - Callback function to handle products data
@returns {void}
*/
const getProductsFromFile = callback => {
    fs.readFile(productsDataPath, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

/**
 * @function
 * @description Writes data to products JSON file.
 * @param {object} data - Data to write to products file.
 * @param {function} callback - Callback function to handle products data.
 * @returns {void}
 */
const writeJSONData = (data, callback) => {
    console.log("DATA " + JSON.stringify(data))
    fs.writeFile(productsDataPath, JSON.stringify(data), err => {
        if (err) {
            callback(err);
        } else {
            callback();
        };
      });
};


/**
@class
@description Represents a product with several properties
*/
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

    /**
    @function
    @description Saves a product to the products file
    @returns {void}
    */
    save() {
        getProductsFromFile(products => {
            
            products.push(this);
            writeJSONData(products, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Save Success')
                }
            });
        });
    };
    

    /**
    @function
    @description Retrieves all products from the products file
    @param {function} callback - Callback function to handle products data
    @returns {void}
    */
    static fetchAll(callback) {
        getProductsFromFile(callback);
    };

    /**
    @function
    @description Updates a product with the specified ID with the provided attributes
    @param {string} id - ID of the product to update
    @param {object} attributes - Attributes to update
    @param {function} callback - Callback function to handle products data after updating
    @returns {void}
    */
    static updateProductById(id, attributes, callback) {
        getProductsFromFile(products => {
            const updateKeys = Object.keys(attributes);
            if (!updateKeys.length) {
                throw new Error('At least one attribute must be updated');
            }
            const productIndex = products.findIndex(p => {return p.productId === id});
            if (productIndex === -1) {
                throw new Error('Product with ID ' + id + ' not found');
            }
            //updating product with new attributes
            products[productIndex] = {
                ...products[productIndex],
                ...attributes
            };
            writeJSONData(products, callback);
        });
    };


    /**
    @function
    @description Retrieves a product with the specified ID from the products file
    @param {string} id - ID of the product to retrieve
    @throws {Error} If no product with the specified ID is found.
    @param {function} callback - Callback function to handle products data
    @returns {void}
    */
    static getProductById(id, callback) {
        getProductsFromFile(products => {
          const product = products.find(product => product.productId == parseInt(id));
          if (product) {
            callback(product);
          } else {
            callback('No product with ID ' + id + ' exists.');
          }
        });
      };


    /**
     * @function
     * @description Deletes a product with the specified ID from the JSON file.
     * @param {string} id - The ID of the product to be deleted.
     * @param {function} callback - Callback function to handle products data
     * @return {void}
     */
    static deleteProductById(id, callback) {
        //Filter out products before rewriting JSON
        getProductsFromFile(products => {
            const updatedProducts = products.filter(product => {
                return product.productId !== id;
            });
            writeJSONData(updatedProducts, callback);
        });
    };
};