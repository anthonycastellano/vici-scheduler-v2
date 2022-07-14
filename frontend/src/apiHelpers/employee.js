import axios from 'axios';

const EMPLOYEES_ENDPOINT = '/api/employees';

const getEmployees = () => {
    return axios.get(EMPLOYEES_ENDPOINT);
};

const deleteEmployee = (id, token) => {
    return axios.delete(EMPLOYEES_ENDPOINT, { data: { _id: id, token } });
};

const updateEmployee = (id, token, firstName, lastName) => {
    return axios.put(EMPLOYEES_ENDPOINT, { data: { _id: id, token, firstName, lastName } });
};

export {
    getEmployees,
    deleteEmployee,
    updateEmployee
};