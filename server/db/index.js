const models = require('./models');
const mongoose = require('./mongoose');

module.exports.mongoose = mongoose;

module.exports.Cities = models.cities;
module.exports.Services = models.services;
module.exports.Users = models.users;
