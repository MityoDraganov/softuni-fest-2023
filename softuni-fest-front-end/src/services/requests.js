import * as api from '../api/api';

const endpoints = {
    registerUser: '/users/register',
    registerBusiness: '/businesses/register',
    loginUser: '/users/login',
    loginBusiness: '/businesses/login',
    logoutUser: '/users/logout',
    logoutBusiness: '/businesses/logout',
    createProduct: '/products/create',
    getAllProducts: '/products',
    editProduct: (id) => `/products/edit/${id}`,
    deleteProduct: (id) => `/products/delete/${id}`,
    getProductsById: (id) => `/products/${id}`,
    getProductsByBusinessId: (id) => `/products/getByOwner/${id}`,
    stripeCheckout: (id) => `/invoice/pay/${id}`,
    coinbaseCheckout: (id) => `/invoice/pay/coinbase/${id}`
};

export const registerUser = async ({ firstName, lastName, email, password, rePassword }) => {
    return api.post(endpoints.registerUser, { firstName, lastName, email, password });
}

export const loginUser = async ({ email, password }) => {
    return api.post(endpoints.loginUser, { email, password });
}

export const registerBusiness = async ({ companyName, email, password, rePassword }) => {
    return api.post(endpoints.registerBusiness, { companyName, email, password, rePassword });
}

export const loginBusiness = async ({ email, password }) => {
    return api.post(endpoints.loginBusiness, { email, password });
}

export const logoutUser = async () => {
    return api.get(endpoints.logoutUser);
}

export const logoutBusiness = async () => {
    return api.get(endpoints.logoutBusiness);
}

export const createProduct = async ({ name, description, price }) => {
    return api.post(endpoints.createProduct, { name, description, price });
}

export const getAllProducts = async () => {
    return api.get(endpoints.getAllProducts);
}

export const getProductById = async (id) => {
    return api.get(endpoints.getProductsById(id));
}

export const getProductsByBusinessId = async (id) => {
    return api.get(endpoints.getProductsByBusinessId(id));
}

export const editProduct = async (id, { name, description, price }) => {
    return api.put(endpoints.editProduct(id), { name, description, price });
}

export const deleteProduct = async (id) => {
    return api.del(endpoints.deleteProduct(id));
}

export const stripeCheckout = async (id) => {
    return api.post(endpoints.stripeCheckout(id));
}

export const coinbaseCheckout = async (id) => {
    return api.post(endpoints.coinbaseCheckout(id));
}