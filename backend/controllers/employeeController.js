const employeeHelpers = require('../helpers/employeeHelpers.js');
const { validate } = require('indicative/validator');
const { sanitize } = require('indicative/sanitizer');

const employeeValidationRules = {
    firstName: 'required|alpha',
    lastName: 'alpha'
};

// remove html tags
const employeeSanitizationRules = {
    firstName: 'stripTags',
    lastName: 'stripTags'
};

// return list of all employees
exports.index = async (req, res) => {
    const employees = await employeeHelpers.getEmployees();
    res.send(employees);
};

// add new employee to db
// TODO: duplicate check
exports.create = async (req, res) => {
    // sanitize body
    sanitize(req.body, employeeSanitizationRules);

    // validate body
    try {
        validate(req.body, employeeValidationRules);
    } catch (e) {
        return res.send(e);
    }

    const employee = await employeeHelpers.createEmployee({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName ? req.body.lastName.toLowerCase() : null
    });
    res.json(employee ? employee : { err: "error creating employee" });
};