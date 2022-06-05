const { getDB } = require('./cosmosHelpers');
const scheduleHelpers = require('./scheduleHelpers');

const EMPLOYEE_COLLECTION_NAME = 'employees';

exports.getEmployees = () => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.find({}).toArray();
};

exports.getEmployeesWithSchedules = async () => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    const employees = await employeeCollection.find({}).toArray();

    // get schedules
    const schedules = await scheduleHelpers.getSchedules();

    // for each employee, populate weekends from schedule
    employees.forEach((employee) => {
        
    });
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

exports.deleteEmployee = async (employee) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    if (!employee.lastName) employee.lastName = null;
    const foundEmployees = await employeeCollection.find(employee).toArray();
    if (!foundEmployees.length) return {};
    return employeeCollection.deleteMany({ _id: foundEmployees[0]._id });
};

exports.convertEmployeeIdsToNames = async (employeeList) => {
    const convertedEmployees = [];
    for (const employeeId of employeeList) {
        const convertedEmployee = await getEmployeeById(employeeId);
        if (!convertedEmployee.length) continue;
        convertedEmployees.push(`${convertedEmployee[0].firstName} ${convertedEmployee[0].lastName}`);
    }
    return convertedEmployees;
};

const getEmployeeById = (id) => {
    const employeeCollection = getDB().collection(EMPLOYEE_COLLECTION_NAME);
    return employeeCollection.find({ _id: id }).toArray();
};