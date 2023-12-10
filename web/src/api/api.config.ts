import axios from 'axios';


export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token : string) => {
    window.localStorage.setItem('auth_token', token);
};

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method : string, url : string, data : any) => {

    let headers = {};
    if (getAuthToken() != null && getAuthToken() != "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};