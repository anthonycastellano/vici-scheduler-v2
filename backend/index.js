const express = require('express');

const PORT = process.env.PORT || '3001';
const app = express();

app.get('/health', (req, res) => {
    res.send('alive');
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
