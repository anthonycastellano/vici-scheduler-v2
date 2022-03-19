const scheduleHelpers = require('../helpers/scheduleHelpers');
const { getDB } = require('../helpers/cosmosHelpers');

exports.index = async (req, res) => {
    const db = getDB();
    const collection = db.collection('schedule');
    res.send(await scheduleHelpers.printCollection(collection));
};