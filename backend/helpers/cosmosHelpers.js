const { MongoClient } = require('mongodb');

let _db;

exports.mongoConnect = async (callback) => {
    try {
        const client = await MongoClient.connect(process.env.COSMOS_CONNECTION_STRING);
        _db = client.db('calendar-db');
        console.log('DB connected');
        callback();
    } catch (err) {
        console.error('Unable to connect to DB', err);
        process.exit(1);
    }
};

exports.getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error('Unable to connect to DB');
    }
};
