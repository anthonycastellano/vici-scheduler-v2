import axios from 'axios';

const EMPLOYEES_ENDPOINT = '/api/employees';

const getEmployees = () => {
    return axios.get(EMPLOYEES_ENDPOINT);
};

const deleteEmployee = (id) => {
    return axios.delete(EMPLOYEES_ENDPOINT, { data: { _id: id } });
};

const updateEmployee = (id, firstName, lastName) => {
    return axios.put(EMPLOYEES_ENDPOINT, { _id: id, firstName, lastName });
};

const createEmployee = (firstName, lastName) => {
    return axios.post(EMPLOYEES_ENDPOINT, { firstName, lastName });
};

export {
    getEmployees,
    deleteEmployee,
    updateEmployee,
    createEmployee
};