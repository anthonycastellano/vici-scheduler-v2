const { MongoClient } = require('mongodb');

let _db;

exports.mongoConnect = (callback) => {
    MongoClient.connect(process.env.COSMOS_CONNECTION_STRING, (err, client) => {
        _db = client.db('calendar-db');
        console.log('DB connected');
        callback();
    });
};

exports.getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error('Unable to connect to DB');
    }
};
