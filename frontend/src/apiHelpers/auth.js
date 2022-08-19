import axios from 'axios';

const login = (username, password) => {
    return axios.post('/api/auth/login', {
        username,
        password
    });
};

const checkAuth = () => {
    return axios.get('/api/auth');
};

export {
    login,
    checkAuth
};