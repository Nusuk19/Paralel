const vehicles = [
  { id: 1, model: 'Toyota Prius', year: 2020, registrationNumber: 'ABC123' },
  { id: 2, model: 'Ford Transit', year: 2018, registrationNumber: 'XYZ789' }
];

const drivers = [
  { id: 1, name: 'John Doe', licenseNumber: 'A123456', vehicleId: 1 },
  { id: 2, name: 'Jane Smith', licenseNumber: 'B987654', vehicleId: 2 }
];

const trips = [
  { id: 1, vehicleId: 1, driverId: 1, startLocation: 'Kyiv', endLocation: 'Lviv', date: '2025-03-01' },
  { id: 2, vehicleId: 2, driverId: 2, startLocation: 'Odesa', endLocation: 'Kharkiv', date: '2025-03-15' }
];

module.exports = { vehicles, drivers, trips };
