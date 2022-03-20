const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Employee', employeeSchema);