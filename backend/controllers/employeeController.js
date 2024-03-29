const employeeHelpers = require('../helpers/employeeHelpers.js');
const { sanitizeEmployee, validateEmployee, validateEmployeeWithID } = require('../helpers/validateHelpers');

// return list of all employees
exports.get = async (req, res) => {
    const employees = await employeeHelpers.getEmployees();
    res.send(employees);
};

// add new employee to db
exports.create = async (req, res) => {
    // sanitize body
    sanitizeEmployee(req.body);

    // validate body
    try {
        await validateEmployee(req.body);
    } catch (e) {
        return res.status(400).json(e[0]);
    }

    // create employee
    const employee = await employeeHelpers.createEmployee({
        firstName: req.body.firstName,
        lastName: req.body.lastName ? req.body.lastName : ''
    });


    if (employee && employee.length) {
        return res.json(employee[0]);
    }
    
    return res.status(500).json({ error: 'Error creating employee' });
};

// modify existing employee
exports.update = async (req, res) => {
    // sanitize body
    sanitizeEmployee(req.body);

    // validate body
    try {
        await validateEmployeeWithID(req.body);
    } catch (e) {
        e[0].error = 'Validation failed';
        return res.status(400).send(e);
    }

    // update employee in collection
    const updateResponse = await employeeHelpers.updateEmployee(req.body);

    if (updateResponse.modifiedCount > 0) {
        return res.status(204).json({ msg: 'Employee updated successfully' });
    }
    return res.status(500).json({ error: 'Error updating employee' });
};

// delete employee
exports.delete = async (req, res) => {
    // sanitize body
    sanitizeEmployee(req.body);

    // validate body
    try {
        await validateEmployeeWithID(req.body);
    } catch (e) {
        e[0].error = 'Validation failed';
        return res.status(400).send(e);
    }

    const result = await employeeHelpers.deleteEmployee(req.body._id);
    if (result.deletedCount) {
        return res.json({ msg: 'Successfully deleted employee' });
    }
    res.status(500).json({ error: 'Error deleting employee' });
};