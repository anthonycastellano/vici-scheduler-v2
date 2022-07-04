import axios from 'axios';

const login = (username, password) => {
    return axios.post('/api/auth/login', {
        username,
        password
    });
};

export {
    login
};