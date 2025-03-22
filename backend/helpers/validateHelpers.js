const { validate, validations, extend } = require('indicative/validator');
const { sanitize, sanitizations } = require('indicative/sanitizer');
const { getValue, skippable } = require('indicative-utils');

// extensions
extend('alphaNumericOrNull', {
    async: false,

    validate (data, field, args, config) {
        const fieldValue = getValue(data, field);

        if (skippable(fieldValue, field, config)) {
            return true;
        }

        if (!fieldValue || /^\w+$/.test(fieldValue)) return true;

        return false;
    }
});

// employees
const employeeValidationRules = {
    firstName: [
        validations.regex(['^[a-zA-Z ]+$']),
        validations.max([12])
    ],
    lastName: [
        validations.regex(['^[a-zA-Z ]+$']),
        validations.max([20])
    ]
};

const employeeWithIDValidationRules = {
    firstName: [
        validations.regex(['^[a-zA-Z ]+$']),
        validations.max([12])
    ],
    lastName: [
        validations.regex(['^[a-zA-Z ]+$']),
        validations.max([20])
    ],
    _id: [
        validations.alphaNumeric(),
        validations.required()
    ]
}

// remove html tags
const employeeSanitizationRules = {
    _id: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    firstName: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    lastName: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ]
};

// schedules
const createScheduleValidationRules = {
    month: [
        validations.number(),
        validations.required()
    ],
    year: [
        validations.number(),
        validations.required()
    ],
    employees: [
        validations.array(),
        validations.required()
    ]
};

const scheduleWithIDValidationRules = {
    _id: [
        validations.alphaNumeric(),
        validations.required()
    ],
    month: [
        validations.number()
    ],
    year: [
        validations.number()
    ],
    leads: [
        validations.array()
    ],
    'leads.*': [
        validations.alphaNumericOrNull()
    ],
    backups: [
        validations.array()
    ],
    'backups.*': [
        validations.alphaNumericOrNull()
    ],
    assists: [
        validations.array()
    ],
    'assists.*': [
        validations.alphaNumericOrNull()
    ]
};

// remove html tags
const scheduleSanitizationRules = {
    _id: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    month: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    year: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    'leads.*': [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    'backups.*': [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    'employees.*': [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    'assists.*': [
        sanitizations.stripTags(),
        sanitizations.trim()
    ]
};

// authentication
const authValidationRules = {
    username: [
        validations.required(),
        validations.alphaNumeric()
    ],
    password: [
        validations.required()
    ]
};

const authSanitizationRules = {
    username: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    password: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ]
};

exports.validateEmployee = (data) => validate(data, employeeValidationRules);
exports.validateEmployeeWithID = (data) => validate(data, employeeWithIDValidationRules);
exports.sanitizeEmployee = (data) => sanitize(data, employeeSanitizationRules);

exports.validateScheduleWithID = (data) => validate(data, scheduleWithIDValidationRules);
exports.validateCreateSchedule = (data) => validate(data, createScheduleValidationRules);
exports.sanitizeSchedule = (data) => sanitize(data, scheduleSanitizationRules);

exports.validateAuth = (data) => validate(data, authValidationRules);
exports.sanitizeAuth = (data) => sanitize(data, authSanitizationRules);
