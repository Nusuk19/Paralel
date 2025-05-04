const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/vehicles', routes);

module.exports = app;