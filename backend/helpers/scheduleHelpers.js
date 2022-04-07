const { getDB } = require('./cosmosHelpers');
const ScheduleGenerator = require('../utils/ScheduleGenerator');

const SCHEDULE_COLLECTION_NAME = 'schedules';

exports.getSchedules = (params) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.find(params).toArray();
};

exports.createSchedule = async (month, year) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    const schedules = await scheduleCollection.find(params).toArray();

    const schedule = ScheduleGenerator(schedules);
    const generatedMonth = schedule.createNewSchedule(month, year);
};

exports.updateSchedule = async (schedule) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);

    const searchParams = { month: schedule.month, year: schedule.year };
    await scheduleCollection.updateOne(searchParams, { $set: {
        leads: schedule.leads,
        backups: schedule.backups
    }});
    return await scheduleCollection.find(schedule).toArray();
};

exports.deleteSchedule = async (month, year) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);

    const foundSchedules = await scheduleCollection.find({ month, year }).toArray();
    if (!foundSchedules.length) return {};
    return scheduleCollection.deleteMany({ _id: foundSchedules[0]._id });
};