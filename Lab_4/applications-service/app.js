const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/applications', routes);

module.exports = app;