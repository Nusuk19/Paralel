const data = require('../data');

const getVehicles = (req, res) => {
  res.json(data.vehicles);
};

const getVehicleById = (req, res) => {
  const vehicle = data.vehicles.find(v => v.id === parseInt(req.params.id));
  if (!vehicle) {
    return res.status(404).send('Vehicle not found');
  }
  res.json(vehicle);
};

const addVehicle = (req, res) => {
  const newVehicle = { id: data.vehicles.length + 1, ...req.body };
  data.vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
};

const updateVehicle = (req, res) => {
  const vehicle = data.vehicles.find(v => v.id === parseInt(req.params.id));
  if (!vehicle) {
    return res.status(404).send('Vehicle not found');
  }
  Object.assign(vehicle, req.body);
  res.json(vehicle);
};

const deleteVehicle = (req, res) => {
  const vehicleIndex = data.vehicles.findIndex(v => v.id === parseInt(req.params.id));
  if (vehicleIndex === -1) {
    return res.status(404).send('Vehicle not found');
  }
  data.vehicles.splice(vehicleIndex, 1);
  res.status(204).send();
};

module.exports = { getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle };
