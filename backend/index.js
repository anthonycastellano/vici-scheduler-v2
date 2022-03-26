require('dotenv').config();
const express = require('express');
const { mongoConnect } = require('./helpers/cosmosHelpers');
const scheduleController = require('./controllers/scheduleController');
const employeeController = require('./controllers/employeeController');

const PORT = process.env.PORT || '3001';
const app = express();

// middleware
app.use(express.json());

// schedule
app.get('/schedule', (req, res) => scheduleController.index(req, res));

// employees
app.get('/employees', (req, res) => employeeController.index(req, res));
app.post('/employees', (req, res) => employeeController.create(req, res));
app.put('/employees', (req, res) => employeeController.update(req, res));
app.delete('/employees', (req, res) => employeeController.delete(req, res));


mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
