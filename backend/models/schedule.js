const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    month: Number,
    year: Number,
    leads: [String],
    backups: [String]
});

module.exports = mongoose.model('Schedule', scheduleSchema);