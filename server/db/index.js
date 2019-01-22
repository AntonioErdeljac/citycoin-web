const models = require('./models');
const mongoose = require('./mongoose');

module.exports.mongoose = mongoose;

module.exports.Cities = models.cities;
module.exports.Users = models.users;
