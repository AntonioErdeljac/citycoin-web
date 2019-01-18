const mongoose = require('mongoose');

const config = require('../config');

mongoose.Promise = Promise;
mongoose.connect(config.mongodb.uri, { useNewUrlParser: true });

module.exports.mongoose = mongoose;
