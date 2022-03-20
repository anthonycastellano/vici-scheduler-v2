const scheduleHelpers = require('../helpers/scheduleHelpers');

// return all created schedules
exports.index = async (req, res) => {
    const schedules = await scheduleHelpers.getMasterSchedule();
    res.send(schedules);
};