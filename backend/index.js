require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = process.env.PORT || '3001';
const app = express();

// middleware
app.use(cors());

mongoose.connect(process.env.COSMOS_CONNECTION_STRING);
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
