const db = require('../server/db');

const cities = [
  {
    general: {
      name: 'Rijeka',
    },
    location: {
      countryCode: 'HR',
      iata: 'RJK',
    },
  },
];

const services = [
  {
    company: {
      name: 'KD Autotrolej d.o.o.',
      nin: '19081493664',
    },
    general: {
      name: 'Autotrolej',
    },
    type: 'BUS',
    subscriptions: [{
      price: '276',
    }],
  },
];

const createService = async () => {
  try {
    const service = services[0];

    const createdService = await db.Services.create(service);

    return createdService;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = async () => {
  try {
    const service = await createService();

    const city = { ...cities[0], services: [{ _id: service._id }] };

    await db.Cities.create(city);
  } catch (error) {
    console.log(error);
  }
};
