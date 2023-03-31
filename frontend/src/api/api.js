import axios from 'axios';
// async functions to interface with API endpoints and perform CRUD operations for our main application
const API_URL = 'http://localhost:8080/api';

export async function getProductsById(productId) {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Failed to retrieve product with ID ${productId}. Server responded with status code ${error.response.status}.`);
        } else if (error.request) {
            throw new Error(`Failed to retrieve product with ID ${productId}. No response received from the server.`);
        } else {
            throw new Error(`Failed to retrieve product with ID ${productId}. Error: ${error.message}.`);
        }
    }
}

export async function getProducts() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Failed to retrieve products. Server responded with status code ${error.response.status}.`);
        } else if (error.request) {
            throw new Error('Failed to retrieve products. No response received from the server.');
        } else {
            throw new Error(`Failed to retrieve products. Error: ${error.message}.`);
        }
    }
}

export async function pushNewProduct(product) {
    try {
        const response = await axios.post(`${API_URL}`, product);
        response.headers['content-type'] = 'application/json';
        return response;
    } catch (error) {
        if (error.response) {
            throw new Error(`Failed to add new product. Server responded with status code ${error.response.status}.`);
        } else if (error.request) {
            throw new Error('Failed to add new product. No response received from the server.');
        } else {
            throw new Error(`Failed to add new product. Error: ${error.message}.`);
        }
    }
}

export async function pushUpdatedProduct(productId, attributes) {
    try {
        const response = await axios.put(`${API_URL}/${productId}`, attributes);
        response.headers['content-type'] = 'application/json';
        return response;
    } catch (error) {
        if (error.response) {
            throw new Error(`Failed to update product with ID ${productId}. Server responded with status code ${error.response.status}.`);
        } else if (error.request) {
            throw new Error(`Failed to update product with ID ${productId}. No response received from the server.`);
        } else {
            throw new Error(`Failed to update product with ID ${productId}. Error: ${error.message}.`);
        }
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Failed to delete product with ID ${productId}. Server responded with status code ${error.response.status}.`);
        } else if (error.request) {
            throw new Error(`Failed to delete product with ID ${productId}. No response received from the server.`);
        } else {
            throw new Error(`Failed to delete product with ID ${productId}. Error: ${error.message}.`);
        }
    }
}
