const scheduleHelpers = require('../helpers/scheduleHelpers');
const { sanitizeSchedule, validateSchedule, validateScheduleWithID } = require('../helpers/validateHelpers');

// return one or all schedules
exports.get = async (req, res) => {
    const params = req.query && (req.query.month || req.query.year) ? {
        month: parseInt(req.query.month),
        year: parseInt(req.query.year)
    } : {};
    const schedules = await scheduleHelpers.getSchedules(params);

    res.send(schedules);
};

// generate a new schedule
exports.create = async (req, res) => {
    // sanitize body
    sanitizeSchedule(req.body);

    // validate body
    try {
        await validateSchedule(req.body);
    } catch (e) {
        e[0].error = 'Validation failed';
        return res.status(400).send(e);
    }

    const newSchedule = await scheduleHelpers.createSchedule(req.body.month, req.body.year);
    
};

// modify existing schedule
exports.update = async (req, res) => {
    // sanitize body
    sanitizeSchedule(req.body);

    // validate body
    try {
        await validateScheduleWithID(req.body);
    } catch (e) {
        e[0].error = 'Validation failed';
        return res.status(400).send(e);
    }

    // update schedule in collection
    const updateResponse = await scheduleHelpers.updateSchedule(req.body);

    if (updateResponse.modifiedCount > 0) {
        return res.status(204).json({ msg: 'Schedule updated successfully' });
    }
    return res.status(500).json({ error: 'Error updating schedule' });
};

// delete schedule
exports.delete = async (req, res) => {
    // sanitize body
    sanitizeSchedule(req.body);

    // validate body
    try {
        await validateScheduleWithID(req.body);
    } catch (e) {
        e[0].error = 'Validation failed';
        return res.status(400).send(e);
    }

    const result = await scheduleHelpers.deleteSchedule(req.body._id);
    if (result.deletedCount) {
        return res.json({ msg: 'Successfully deleted schedule' });
    }
    res.status(500).json({ error: 'Error deleting schedule' });
};