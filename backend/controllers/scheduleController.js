const scheduleHelpers = require('../helpers/scheduleHelpers');

// return one or all schedules
exports.index = async (req, res) => {
    const params = req.query && (req.query.month || req.query.year) ? {
        month: parseInt(req.query.month),
        year: parseInt(req.query.year)
    } : {};
    console.log(params);
    const schedules = await scheduleHelpers.getSchedules(params);
    res.send(schedules);
};

// generate a new schedule
exports.create = async (req, res) => {

};

// modify existing schedule
exports.update = async (req, res) => {

};

// delete schedule
exports.delete = async (req, res) => {

};