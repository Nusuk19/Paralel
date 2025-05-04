const { applications } = require('./data');
const axios = require('axios');

exports.getAllApplications = (req, res) => {
  res.json(applications);
};

exports.createApplication = (req, res) => {
  const { destination, requiredCapacity } = req.body;

  if (!destination || !requiredCapacity) {
    return res.status(400).send({ message: "Всі поля повинні бути заповнені" });
  }

  const application = {
    id: applications.length + 1,
    destination,
    requiredCapacity,
    assignedDriverId: null,
    assignedVehicleId: null,
    completed: false,
  };

  applications.push(application);
  res.status(201).json(application);
};

exports.assignApplication = async (req, res) => {
  const { id } = req.params;
  const { driverId, vehicleId } = req.body;
  const application = applications.find(a => a.id === parseInt(id));

  if (!application) {
    return res.status(404).send({ message: "Заявка не знайдена" });
  }

  if (application.completed) {
    return res.status(400).send({ message: "Заявка вже виконана" });
  }

  try {
    const driverRes = await axios.get(`http://drivers-service:4002/drivers`);
    const driver = driverRes.data.find(d => d.id === driverId);
    if (!driver) return res.status(404).send({ message: "Водій не знайдений" });

    const vehicleRes = await axios.get(`http://vehicles-service:4003/vehicles`);
    const vehicle = vehicleRes.data.find(v => v.id === vehicleId);

    if (!vehicle) return res.status(404).send({ message: "Автомобіль не знайдений" });
    if (vehicle.status !== 'working') return res.status(400).send({ message: "Автомобіль не в робочому стані" });
    if (vehicle.capacity < application.requiredCapacity) return res.status(400).send({ message: "Автомобіль не підходить за місткістю" });

    application.assignedDriverId = driverId;
    application.assignedVehicleId = vehicleId;
    res.status(200).json(application);

  } catch (error) {
    res.status(500).send({ message: "Помилка при зверненні до мікросервісів", error: error.message });
  }
};

exports.completeApplication = async (req, res) => {
  const { id } = req.params;
  const application = applications.find(a => a.id === parseInt(id));

  if (!application) return res.status(404).send({ message: "Заявка не знайдена" });
  if (application.completed) return res.status(400).send({ message: "Рейс вже завершено" });

  try {
    await axios.put(`http://vehicles-service:4003/vehicles/${application.assignedVehicleId}/status`, {
      status: 'maintenance'
    });
    application.completed = true;
    res.status(200).json(application);
  } catch (error) {
    res.status(500).send({ message: "Не вдалося оновити статус авто", error: error.message });
  }
};
