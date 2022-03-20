const { getDB } = require('./cosmosHelpers');

const SCHEDULE_COLLECTION_NAME = 'schedule';

exports.getMasterSchedule = async () => {
    const scheduleCollection = getDB().collection(SCHEDULE_COLLECTION_NAME);
    const schedules = await scheduleCollection.find({}).toArray();
    if (!schedules.length) return;
    delete schedules[0]._id;
    return schedules[0];
};