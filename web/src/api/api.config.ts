import axios from 'axios';
import { logoutUser } from './logout';
// import { jwtDecode } from 'jwt-decode';

export const getAuthToken = () => {
    return window.localStorage.getItem('token');
};

export const setAuthHeader = (token: string) => {
    window.localStorage.setItem('token', token);
};

export const api = axios.create({
    baseURL: 'http://localhost:8081/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    function (config) {
        const token = getAuthToken();
        if (token != null && token != "null") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        console.error(error);
    }
)

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.error(error)
        logoutUser();
    }
)