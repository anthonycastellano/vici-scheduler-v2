const { getDB } = require('./cosmosHelpers');
const ScheduleGenerator = require('../utils/ScheduleGenerator');
const ObjectId = require('mongodb').ObjectID;

const SCHEDULE_COLLECTION_NAME = 'schedules';

exports.getSchedules = (params) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.find(params).toArray();
};

exports.createSchedule = async (month, year, employees) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    const schedules = await exports.getSchedules();

    const generator = ScheduleGenerator(schedules);
    return(generator.createNewSchedule(month, year, employees));
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

exports.exists = (month, year) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.find({ month, year }.toArray().length)
};