const data = require('../data');

const getDrivers = (req, res) => {
  res.json(data.drivers);
};

const getDriverById = (req, res) => {
  const driver = data.drivers.find(d => d.id === parseInt(req.params.id));
  if (!driver) {
    return res.status(404).send('Driver not found');
  }
  res.json(driver);
};

const addDriver = (req, res) => {
  const newDriver = { id: data.drivers.length + 1, ...req.body };
  data.drivers.push(newDriver);
  res.status(201).json(newDriver);
};

const updateDriver = (req, res) => {
  const driver = data.drivers.find(d => d.id === parseInt(req.params.id));
  if (!driver) {
    return res.status(404).send('Driver not found');
  }
  Object.assign(driver, req.body);
  res.json(driver);
};

const deleteDriver = (req, res) => {
  const driverIndex = data.drivers.findIndex(d => d.id === parseInt(req.params.id));
  if (driverIndex === -1) {
    return res.status(404).send('Driver not found');
  }
  data.drivers.splice(driverIndex, 1);
  res.status(204).send();
};

module.exports = { getDrivers, getDriverById, addDriver, updateDriver, deleteDriver };
