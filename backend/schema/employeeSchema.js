const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: String,
    lastName: String
});

exports.Employee = mongoose.model('Employee', employeeSchema);