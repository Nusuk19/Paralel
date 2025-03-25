const express = require('express');
const bodyParser = require('body-parser');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const driversRoutes = require('./routes/driversRoutes');
const tripsRoutes = require('./routes/tripsRoutes');

const app = express();
app.use(bodyParser.json()); 

app.use('/vehicles', vehiclesRoutes);
app.use('/drivers', driversRoutes);
app.use('/trips', tripsRoutes);

module.exports = app;
