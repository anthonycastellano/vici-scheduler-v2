import axios from 'axios';

const getEmployees = () => {
    return axios.get('/api/employees');
};

const getEmployeesWithSchedules = () => {
    return axios.get('/api/employees?withSchedules=true');
};

const deleteEmployee = (employeeID) => {

};

export {
    getEmployees,
    getEmployeesWithSchedules
};