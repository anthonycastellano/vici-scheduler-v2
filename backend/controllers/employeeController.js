const employeeHelpers = require('../helpers/employeeHelpers.js');
const validateHelpers = require('../helpers/validateHelpers');

// return list of all employees
exports.get = async (req, res) => {
    const employees = await employeeHelpers.getEmployees();
    res.send(employees);
};

// add new employee to db
exports.create = async (req, res) => {
    // sanitize body
    validateHelpers.sanitizeEmployee(req.body);

    // validate body
    try {
        await validateHelpers.validateEmployee(req.body);
    } catch (e) {
        res.status(400);
        e[0].error = 'Validation failed';
        return res.send(e);
    }

    // check for duplicate employee
    if (await employeeHelpers.exists(req.body)) {
        res.status(400);
        return res.send({ error: 'Employee already exists' });
    }

    // create employee
    const employee = await employeeHelpers.createEmployee({
        firstName: req.body.firstName,
        lastName: req.body.lastName ? req.body.lastName : null
    });


    if (employee && employee.length) {
        return res.json(employee[0]);
    }
    res.status(500);
    return res.json({ error: 'Error creating employee' });
};

// modify existing employee
exports.update = async (req, res) => {
    // sanitize body
    validateHelpers.sanitizeEmployee(req.body.employeeOld);
    validateHelpers.sanitizeEmployee(req.body.employeeNew);

    // validate body
    try {
        await validateHelpers.validateEmployee(req.body.employeeOld);
        await validateHelpers.validateEmployee(req.body.employeeNew);
    } catch (e) {
        res.status(400);
        e[0].error = 'Validation failed';
        return res.send(e);
    }

    // check for duplicate employee
    if (await employeeHelpers.exists(req.body.employeeNew)) {
        res.status(400);
        return res.send({ error: 'Employee already exists' });
    }

    // update employee in collection
    const employee = await employeeHelpers.updateEmployee(req.body.employeeOld, req.body.employeeNew);

    if (employee && employee.length) {
        return res.json(employee[0]);
    }
    res.status(500);
    return res.json({ error: 'Error updating employee' });
};

// delete employee
exports.delete = async (req, res) => {
    // sanitize body
    validateHelpers.sanitizeEmployee(req.body);

    // validate body
    try {
        await validateHelpers.validateEmployee(req.body);
    } catch (e) {
        res.status(400);
        e[0].error = 'Validation failed';
        return res.send(e);
    }

    const result = await employeeHelpers.deleteEmployee(req.body._id);
    if (result.deletedCount) {
        return res.json({ msg: 'Successfully deleted employee' });
    }
    res.status(500);
    res.json({ error: 'Error deleting employee' });
};