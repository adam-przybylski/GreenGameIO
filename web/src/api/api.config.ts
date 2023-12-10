import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string) => {
    window.localStorage.setItem('auth_token', token);
};

export const api = axios.create({
    baseURL: 'http://localhost:8081/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    function (config) {
        if (getAuthToken() != null && getAuthToken() != "null") {
            config.headers.Authorization = `Bearer ${getAuthToken()}`;
        }
        return config;
    },
    function (error) {
        console.error(error);
    }
)