const scheduleHelpers = require('../helpers/scheduleHelpers');

// return one or all created schedules
// TODO: handle query for specific schedule
exports.index = async (req, res) => {
    const schedules = await scheduleHelpers.getSchedules();
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