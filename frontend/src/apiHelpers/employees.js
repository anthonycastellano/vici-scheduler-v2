import axios from 'axios';

const getEmployees = () => {
    return axios.get(`/api/employees`);
};

export { getEmployees };