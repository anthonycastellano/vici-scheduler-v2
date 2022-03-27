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

exports.deleteSchedule = (month, year) => {

};