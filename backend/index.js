require('dotenv').config();
const express = require('express');
const { mongoConnect } = require('./helpers/cosmosHelpers');
const scheduleController = require('./controllers/scheduleController');
const employeeController = require('./controllers/employeeController');

const PORT = process.env.PORT || '3001';
const app = express();

// middleware
app.use(express.json());

// schedules
app.get('/schedules', (req, res) => scheduleController.get(req, res));
app.post('/schedules', (req, res) => scheduleController.create(req, res));
app.put('/schedules', (req, res) => scheduleController.update(req, res));
app.delete('/schedules', (req, res) => scheduleController.delete(req, res)); 

// employees
app.get('/employees', (req, res) => employeeController.get(req, res));
app.post('/employees', (req, res) => employeeController.create(req, res));
app.put('/employees', (req, res) => employeeController.update(req, res));
app.delete('/employees', (req, res) => employeeController.delete(req, res));

app.get('/*', (req, res) => {
    res.send('hello');
});

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
