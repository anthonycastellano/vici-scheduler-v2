const { getDB } = require('./cosmosHelpers');
const ObjectId = require('mongodb').ObjectID;

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
};

exports.updateEmployee = async (employee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    if (!employee.lastName) employee.lastName = "";
    return employeeCollection.updateOne({ _id: employee._id }, { $set: {
        firstName: employee.firstName,
        lastName: employee.lastName
    }});
};

exports.deleteEmployee = (id) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.deleteOne({ _id: ObjectId(id) });
};