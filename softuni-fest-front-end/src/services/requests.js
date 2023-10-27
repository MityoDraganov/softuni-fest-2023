import * as api from '../api/api';

const endpoints = {
    registerUser: '/users/register',
    loginUser: '/users/login',
    registerBusiness: '/businesses/register',
    loginBusiness: '/businesses/login'
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