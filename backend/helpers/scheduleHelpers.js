const { getDB } = require('./cosmosHelpers');
const ScheduleGenerator = require('../utils/ScheduleGenerator');
const ObjectId = require('mongodb').ObjectID;

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

exports.updateSchedule = (schedule) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);

    return scheduleCollection.updateOne({ _id: ObjectId(schedule._id) }, { $set: {
        leads: schedule.leads,
        backups: schedule.backups
    }});
};

exports.deleteSchedule = (id) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.deleteOne({ _id: ObjectId(id) });
};