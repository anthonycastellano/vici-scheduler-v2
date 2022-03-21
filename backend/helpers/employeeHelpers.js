const { getDB } = require('./cosmosHelpers');

const EMPLOYEE_COLLECTION_NAME = 'employees';

exports.getEmployees = () => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.find({}).toArray();
};

exports.createEmployee = (employee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.insertMany([employee]);
};