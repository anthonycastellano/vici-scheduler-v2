const { validate, validations } = require('indicative/validator');
const { sanitize, sanitizations } = require('indicative/sanitizer');

const employeeValidationRules = {
    firstName: [
        validations.required(),
        validations.alpha()
    ],
    lastName: [
        validations.alpha()
    ]
};

// remove html tags
const employeeSanitizationRules = {
    firstName: [
        sanitizations.stripTags()
    ],
    lastName: [
        sanitizations.stripTags()
    ]
};

exports.validateEmployee = (data) => validate(data, employeeValidationRules);

exports.sanitizeEmployee = (data) => sanitize(data, employeeSanitizationRules);