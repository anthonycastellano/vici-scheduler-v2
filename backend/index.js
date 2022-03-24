require('dotenv').config();
const express = require('express');
const { mongoConnect } = require('./helpers/cosmosHelpers');
const scheduleController = require('./controllers/scheduleController');
const employeeController = require('./controllers/employeeController');

const PORT = process.env.PORT || '3001';
const app = express();

// middleware
app.use(express.json());

app.get('/schedule', (req, res) => {
    return scheduleController.index(req, res);
});

app.get('/employees', (req, res) => {
    return employeeController.index(req, res);
});

app.post('/employees', (req, res) => {
    return employeeController.create(req, res);
});

app.put('/employees', (req, res) => {
    return employeeController.update(req, res);
});

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
});
