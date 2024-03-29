require('dotenv').config();
const express = require('express');
const { mongoConnect } = require('./helpers/cosmosHelpers');
const scheduleController = require('./controllers/scheduleController');
const employeeController = require('./controllers/employeeController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || '3001';
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// schedules
app.get('/schedules', (req, res) => scheduleController.get(req, res));
app.post('/schedules', authMiddleware, (req, res) => scheduleController.create(req, res));
app.put('/schedules', authMiddleware, (req, res) => scheduleController.update(req, res));
app.delete('/schedules', authMiddleware, (req, res) => scheduleController.delete(req, res));

// employees
app.get('/employees', (req, res) => employeeController.get(req, res));
app.post('/employees', authMiddleware, (req, res) => employeeController.create(req, res));
app.put('/employees', authMiddleware, (req, res) => employeeController.update(req, res));
app.delete('/employees', authMiddleware, (req, res) => employeeController.delete(req, res));

// auth
app.post('/auth/login', (req, res) => authController.login(req, res));
app.get('/auth', authMiddleware, (req, res) => res.status(200).send('Success'));

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
