const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/drivers', routes);

module.exports = app;