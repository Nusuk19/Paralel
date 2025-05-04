const { vehicles } = require('./data');

exports.getAllVehicles = (req, res) => {
  res.json(vehicles);
};

exports.updateVehicleStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const vehicle = vehicles.find(v => v.id === parseInt(id));

  if (!vehicle) return res.status(404).send({ message: "Автомобіль не знайдений" });
  if (!['working', 'maintenance'].includes(status)) return res.status(400).send({ message: "Невірний статус автомобіля" });

  vehicle.status = status;
  res.status(200).json(vehicle);
};
