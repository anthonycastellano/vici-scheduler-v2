const employeeHelpers = require('../helpers/employeeHelpers.js');
const validateHelpers = require('../helpers/validateHelpers');

// return list of all employees
exports.index = async (req, res) => {
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
        e[0].err = 'validation failed';
        return res.send(e);
    }

    // check for duplicate employee
    if (employeeHelpers.exists(req.body)) {
        res.status(400);
        return res.send({ err: 'employee already exists' });
    }

    // create employee
    const employee = await employeeHelpers.createEmployee({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName ? req.body.lastName.toLowerCase() : null
    });
    if (employee && employee.length) {
        return res.json(employee[0]);
    }
    res.status(500);
    return res.json({ err: 'error creating employee' });
};

// modify existing employee
// TODO: this
exports.update = async (req, res) => {
    // sanitize body
    sanitize(req.body, employeeSanitizationRules);

    // validate body
    try {
        validate(req.body, employeeValidationRules);
    } catch (e) {
        return res.send(e);
    }

    const employee = await employeeHelpers.updateEmployee({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName ? req.body.lastName.toLowerCase() : null
    });
    res.json(employee && employee.length ? employee[0] : { err: "error updating employee" });
};