const { drivers } = require('./data');
exports.getAllDrivers = (req, res) => {
  res.status(200).json(drivers);
};