const { z } = require('zod');

// --- helpers -------------------------------------------------------------

// indicative treated null/undefined/'' as "skippable" for non-required rules;
// reproduce that so optional fields keep the same behavior
const optionalize = (v) => (v === null || v === undefined || v === '' ? undefined : v);

// validate(data, schema) rejects with an array of {rule, field, message}
// errors, matching the shape the controllers expect from the old indicative
// validators (they read e[0] / set e[0].error)
const validateWith = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        return Promise.reject(result.error.issues.map((issue) => ({
            rule: 'validation',
            field: issue.path.join('.'),
            message: issue.message
        })));
    }
    return Promise.resolve(true);
};

const NAME_REGEX = /^[a-zA-Z ]+$/;
const WORD_REGEX = /^\w+$/;

const nameField = (max) =>
    z.preprocess(optionalize,
        z.string({ error: 'string' })
            .regex(NAME_REGEX, 'regex')
            .max(max, `max:${max}`)
            .optional());

const wordField = () =>
    z.preprocess(optionalize,
        z.string({ error: 'string' })
            .regex(WORD_REGEX, 'alphaNumeric')
            .optional());

const numberField = () =>
    z.preprocess(optionalize,
        z.coerce.number({ error: 'number' }).optional());

const wordArrayField = () =>
    z.preprocess(optionalize, z.array(z.union([
        z.literal(''),
        z.null(),
        z.string().regex(WORD_REGEX, 'alphaNumericOrNull')
    ])).optional());

const REQUIRED_STR = (label) =>
    z.string({ error: `required:${label}` })
        .min(1, `required:${label}`);

// --- schemas -------------------------------------------------------------

// employees
const employeeSchema = z.object({
    firstName: nameField(12),
    lastName: nameField(20)
});

const employeeWithIDSchema = z.object({
    firstName: nameField(12),
    lastName: nameField(20),
    _id: z.preprocess(optionalize,
        z.string({ error: 'string' })
            .regex(WORD_REGEX, 'alphaNumeric')
            .min(1, 'required'))
});

// schedules
const createScheduleSchema = z.object({
    month: z.coerce.number({ error: 'number' }),
    year: z.coerce.number({ error: 'number' }),
    employees: z.array(z.any())
});

const scheduleWithIDSchema = z.object({
    _id: z.preprocess(optionalize,
        z.string({ error: 'string' })
            .regex(WORD_REGEX, 'alphaNumeric')
            .min(1, 'required')),
    month: numberField(),
    year: numberField(),
    leads: wordArrayField(),
    backups: wordArrayField(),
    assists: wordArrayField()
});

// authentication
const authSchema = z.object({
    username: z.preprocess(optionalize, REQUIRED_STR('alphaNumeric').regex(WORD_REGEX, 'alphaNumeric')),
    password: z.preprocess(optionalize, REQUIRED_STR('required'))
});

// --- sanitization (strip html tags + trim, in place) ---------------------

const stripTags = (value) =>
    typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim() : value;

// mutates obj so controllers keep using req.body after sanitizing
const sanitizeFields = (obj, scalarFields, arrayFields) => {
    if (!obj || typeof obj !== 'object') return obj;

    for (const field of scalarFields) {
        if (typeof obj[field] === 'string') obj[field] = stripTags(obj[field]);
    }
    for (const field of arrayFields) {
        if (Array.isArray(obj[field])) {
            obj[field] = obj[field].map(stripTags);
        }
    }
    return obj;
};

// --- exports --------------------------------------------------------------

exports.validateEmployee = (data) => validateWith(employeeSchema, data);
exports.validateEmployeeWithID = (data) => validateWith(employeeWithIDSchema, data);
exports.sanitizeEmployee = (data) => sanitizeFields(data, ['_id', 'firstName', 'lastName'], []);

exports.validateScheduleWithID = (data) => validateWith(scheduleWithIDSchema, data);
exports.validateCreateSchedule = (data) => validateWith(createScheduleSchema, data);
exports.sanitizeSchedule = (data) => sanitizeFields(
    data,
    ['_id', 'month', 'year'],
    ['leads', 'backups', 'employees', 'assists']
);

exports.validateAuth = (data) => validateWith(authSchema, data);
exports.sanitizeAuth = (data) => sanitizeFields(data, ['username', 'password'], []);
