import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export function getProductsById(productId) {
    return axios.get(`${API_URL}/${productId}`);
}

export function getProducts() {
    return axios.get(`${API_URL}`);
}

export function createProduct(productId, product) {
    const res = axios.post(`${API_URL}/${productId}`, product);
    res.data.headers('Content-Type', 'application/json');
    return res;
}

export function updateProduct(productId, attributes) {
    const res = axios.put(`${API_URL}/${productId}`, attributes);
    res.data.headers('Content-Type', 'application/json');
    return res;
}

export function deleteProduct(productId) {
    return axios.delete(`${API_URL}/${productId}`);
}