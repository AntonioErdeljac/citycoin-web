const db = require('../server/db');

const cities = [
  {
    general: {
      name: 'Kastav',
    },
    location: {
      coordinates: [45.3716, 14.3504],
      type: 'Point',
    },
    info: {
      countryCode: 'HR',
    },
  },
];

const services = [
  {
    company: {
      name: 'Grad Kastav',
      nin: '19081493664',
    },
    general: {
      name: 'Kastavska čitalnica',
    },
    type: 'EDUCATION',
  },
  {
    company: {
      name: 'Grad Kastav',
      nin: '19081493664',
    },
    general: {
      name: 'Školska sportska dvorana',
    },
    type: 'GYM',
  },
  // {
  //   company: {
  //     name: 'HALUbike',
  //     nin: '111',
  //   },
  //   general: {
  //     name: 'HALUBike',
  //   },
  //   type: 'BIKE',
  // },
  // {
  //   company: {
  //     name: 'Rijeka sport d.o.o.',
  //     nin: '73293310543',
  //   },
  //   general: {
  //     name: 'Bazeni Kantrida',
  //   },
  //   type: 'GYM',
  // },
  // {
  //   company: {
  //     name: 'Rijeka sport d.o.o.',
  //     nin: '73293310543',
  //   },
  //   general: {
  //     name: 'Stadion Kantrida',
  //   },
  //   type: 'GYM',
  // },
  // {
  //   company: {
  //     name: 'Rijeka sport d.o.o.',
  //     nin: '73293310543',
  //   },
  //   general: {
  //     name: 'Astronomski centar Rijeka',
  //   },
  //   type: 'OTHER',
  // },
];

const createServices = async () => {
  try {
    const subscriptions = [
      {
        description: 'Dnevna karta',
        price: 15,
        duration: 1,
        durationUnit: 'hours',
      },
      {
        description: 'Mjesecna karta',
        price: 200,
        duration: 1,
        durationUnit: 'months',
      },
    ];

    const createdSubscriptions = await Promise.all(subscriptions.map(subscription => db.Subscriptions.create(subscription)));

    const createdServices = await Promise.all(services.map((service => db.Services.create({ ...service, subscriptions: createdSubscriptions.map(subscription => subscription._id) }))));

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
