const { getDB } = require('./cosmosHelpers');

const SCHEDULE_COLLECTION_NAME = 'schedules';

exports.getSchedules = (params) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.find(params).toArray();
};

exports.createSchedule = (month, year) => {

};

exports.updateSchedule = (schedule) => {

};

exports.deleteSchedule = async (month, year) => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    const foundSchedules = await scheduleCollection.find({ month, year }).toArray();
    if (!foundSchedules.length) return {};
    return scheduleCollection.deleteMany({ _id: foundSchedules[0]._id });
};