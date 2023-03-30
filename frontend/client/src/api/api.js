import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export async function getProductsById(productId) {
    const req = await axios.get(`${API_URL}/${productId}`);
    return req.data;
}

export async function getProducts() {
    const req = await axios.get(`${API_URL}`); 
    return req.data;
}

export async function createProduct(productId, product) {
    const res = await axios.post(`${API_URL}/${productId}`, product);
    res.data.headers('Content-Type', 'application/json');
    return res;
}

export async function updateProduct(productId, attributes) {
    const res = await axios.put(`${API_URL}/${productId}`, attributes);
    res.data.headers('Content-Type', 'application/json');
    return res;
}

export async function deleteProduct(productId) {
    const res = await axios.delete(`${API_URL}/${productId}`);
    return res.data;
}