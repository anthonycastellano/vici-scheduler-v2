const { validate, validations } = require('indicative/validator');
const { sanitize, sanitizations } = require('indicative/sanitizer');

// employees
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
        sanitizations.stripTags(),
        sanitizations.trim()
    ],
    lastName: [
        sanitizations.stripTags(),
        sanitizations.trim()
    ]
};


// schedules
const scheduleValidationRules = {
    month: [
        validations.required(),
        validations.number()
    ],
    year: [
        validations.required(),
        validations.number()
    ],
    leads: [
        validations.array()
    ],
    'leads.*': [
        validations.alphaNumeric()
    ],
    backups: [
        validations.array()
    ],
    'backups.*': [
        validations.alphaNumeric()
    ]
};

// remove html tags
const scheduleSanitizationRules = {
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
    ]
};

// authentication
const authValidationRules = {
    username: [
        validations.required(),
        validations.alphaNumeric()
    ],
    password: [
        validations.required(),
        validations.alphaNumeric()
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
exports.sanitizeEmployee = (data) => sanitize(data, employeeSanitizationRules);

exports.validateSchedule = (data) => validate(data, scheduleValidationRules);
exports.sanitizeSchedule = (data) => sanitize(data, scheduleSanitizationRules);

exports.validateAuth = (data) => validate(data, authValidationRules);
exports.sanitizeAuth = (data) => sanitize(data, authSanitizationRules);