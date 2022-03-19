require('dotenv').config();
const express = require('express');
const { mongoConnect } = require('./helpers/cosmosHelpers');
const scheduleController = require('./controllers/scheduleController');

const PORT = process.env.PORT || '3001';
const app = express();

app.get('/schedule', (req, res) => {
    return scheduleController.index(req, res);
});

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
});
