const { getDB } = require('./cosmosHelpers');
const ObjectId = require('mongodb').ObjectID;
const { createNewSchedule } = require('./scheduleGenerator');

const SCHEDULE_COLLECTION_NAME = 'schedules';

exports.getSchedules = (params) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.find(params).toArray();
};

exports.createSchedule = async (month, year, employees, withAssists) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);

    const newSchedule = createNewSchedule(month, year, employees, withAssists);

    const { insertedIds } = await scheduleCollection.insertMany([newSchedule]);
    if (insertedIds) {
        return await scheduleCollection.find({ _id: insertedIds["0"] }).toArray();
    }
};

exports.updateSchedule = (schedule) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);

    return scheduleCollection.updateOne({ _id: ObjectId(schedule._id) }, { $set: {
        leads: schedule.leads,
        backups: schedule.backups,
        assists: schedule.assists
    }});
};

exports.deleteSchedule = (id) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.deleteOne({ _id: ObjectId(id) });
};

exports.exists = async (month, year) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    const schedule = await scheduleCollection.find({ month, year }).toArray();
    return schedule.length;
};