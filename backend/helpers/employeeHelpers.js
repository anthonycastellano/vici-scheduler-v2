const { getDB } = require('./cosmosHelpers');

const EMPLOYEE_COLLECTION_NAME = 'employees';

exports.getEmployees = () => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.find({}).toArray();
};

exports.createEmployee = async (employee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    const { insertedIds } = await employeeCollection.insertMany([employee]);
    if (insertedIds) {
        return await employeeCollection.find({ _id: insertedIds["0"] }).toArray();
    }
    return;
};