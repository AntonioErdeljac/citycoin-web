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
  {
    company: {
      name: 'HALUbike',
      nin: '111',
    },
    general: {
      name: 'HALUBike',
    },
    type: 'BIKE',
    subscriptions: [{
      price: '180',
    }],
  },
  {
    company: {
      name: 'Rijeka sport d.o.o.',
      nin: '73293310543',
    },
    general: {
      name: 'Bazeni Kantrida',
    },
    type: 'GYM',
    subscriptions: [{
      price: '100',
    }],
  },
  {
    company: {
      name: 'Rijeka sport d.o.o.',
      nin: '73293310543',
    },
    general: {
      name: 'Stadion Kantrida',
    },
    type: 'GYM',
    subscriptions: [{
      price: '100',
    }],
  },
  {
    company: {
      name: 'Rijeka sport d.o.o.',
      nin: '73293310543',
    },
    general: {
      name: 'Astronomski centar Rijeka',
    },
    type: 'OTHER',
    subscriptions: [{
      price: '100',
    }],
  },
];

const createServices = async () => {
  try {
    const createdServices = await Promise.all(services.map((service => db.Services.create(service))));

    return createdServices;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = async () => {
  try {
    const cityServices = await createServices();

    const city = { ...cities[0], services: cityServices };

    await db.Cities.create(city);
  } catch (error) {
    console.log(error);
  }
};
