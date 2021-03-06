const models = require('./models');
const mongoose = require('./mongoose');

module.exports.mongoose = mongoose;

module.exports.Cities = models.cities;
module.exports.Services = models.services;
module.exports.SubscribedServices = models.subscribedServices;
module.exports.Subscriptions = models.subscriptions;
module.exports.Users = models.users;
module.exports.Wallets = models.wallets;
