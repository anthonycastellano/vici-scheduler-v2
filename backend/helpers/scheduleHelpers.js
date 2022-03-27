const { getDB } = require('./cosmosHelpers');

const SCHEDULE_COLLECTION_NAME = 'schedules';

exports.getSchedules = () => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    return scheduleCollection.find({}).toArray();
};

exports.createSchedule = (month, year) => {

};

exports.updateSchedule = (schedule) => {

};

exports.deleteSchedule = (month, year) => {

};