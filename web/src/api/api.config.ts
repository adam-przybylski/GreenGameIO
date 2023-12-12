import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

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
        const token = getAuthToken();
        if (token != null && token != "null") {
            // const decodedToken = jwtDecode(token);
            // const date = new Date();
            // if (decodedToken.exp !== undefined && decodedToken.exp * 1000 < date.getTime()) {
            //     window.localStorage.removeItem("auth_token");
            // }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        console.error(error);
    }
)