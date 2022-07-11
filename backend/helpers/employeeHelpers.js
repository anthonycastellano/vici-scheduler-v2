const { getDB } = require('./cosmosHelpers');
const scheduleHelpers = require('./scheduleHelpers');

const EMPLOYEE_COLLECTION_NAME = 'employees';

exports.getEmployees = () => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.find({}).toArray();
};

exports.exists = async (employee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    if (!employee.lastName) employee.lastName = null;
    const employees = await employeeCollection.find(employee).toArray();
    return employees.length;
};

exports.createEmployee = async (employee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    const { insertedIds } = await employeeCollection.insertMany([employee]);
    if (insertedIds) {
        return await employeeCollection.find({ _id: insertedIds["0"] }).toArray();
    }
};

exports.updateEmployee = async (employee, updatedEmployee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    if (!employee.lastName) employee.lastName = null;
    await employeeCollection.updateOne(employee, { $set: {
        firstName: updatedEmployee.firstName,
        lastName: updatedEmployee.lastName
    }});
    return await employeeCollection.find(updatedEmployee).toArray();
};

exports.deleteEmployee = (id) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.deleteMany({ _id: id });
};