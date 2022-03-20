const { getDB } = require('./cosmosHelpers');

const EMPLOYEE_COLLECTION_NAME = 'employees';

exports.getEmployees = async () => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    const employees = await scheduleCollection.find({}).toArray();
};