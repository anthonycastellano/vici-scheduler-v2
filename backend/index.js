require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { mongoConnect } = require('./helpers/cosmosHelpers');
const scheduleController = require('./controllers/scheduleController');
const employeeController = require('./controllers/employeeController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || '3001';
const app = express();

// behind the nginx proxy; needed for correct client IP in the rate limiter
app.set('trust proxy', 1);

// security headers
app.use(helmet());

// middleware
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

// brute-force protection on the login endpoint
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts, try again later'
});

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
app.post('/auth/login', loginLimiter, (req, res) => authController.login(req, res));
app.get('/auth', authMiddleware, (req, res) => res.status(200).send('Success'));

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
