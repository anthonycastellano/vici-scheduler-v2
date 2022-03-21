const mongoose = require('mongoose');
const { Employee } = require('../schema/employeeSchema');

exports.mongoConnect = async (callback) => {
    await mongoose.connect(process.env.COSMOS_CONNECTION_STRING);
    const employee = Employee({ firstName: 'first', lastName: 'last' });
    employee.save();
    console.log('db connected');
    callback();
};
