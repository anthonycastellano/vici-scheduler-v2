import axios from 'axios';

const getEmployees = () => {
    return axios.get('/api/employees');
};

const deleteEmployee = (id, token) => {
    return axios.delete('/api/employees', { data: { _id: id, token } });
};

export {
    getEmployees,
    deleteEmployee
};