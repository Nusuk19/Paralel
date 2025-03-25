const data = require('../data');

const getTrips = (req, res) => {
  res.json(data.trips);
};

const getTripById = (req, res) => {
  const trip = data.trips.find(t => t.id === parseInt(req.params.id));
  if (!trip) {
    return res.status(404).send('Trip not found');
  }
  res.json(trip);
};

const addTrip = (req, res) => {
  const newTrip = { id: data.trips.length + 1, ...req.body };
  data.trips.push(newTrip);
  res.status(201).json(newTrip);
};

const updateTrip = (req, res) => {
  const trip = data.trips.find(t => t.id === parseInt(req.params.id));
  if (!trip) {
    return res.status(404).send('Trip not found');
  }
  Object.assign(trip, req.body);
  res.json(trip);
};

const deleteTrip = (req, res) => {
  const tripIndex = data.trips.findIndex(t => t.id === parseInt(req.params.id));
  if (tripIndex === -1) {
    return res.status(404).send('Trip not found');
  }
  data.trips.splice(tripIndex, 1);
  res.status(204).send();
};

module.exports = { getTrips, getTripById, addTrip, updateTrip, deleteTrip };
