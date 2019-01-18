const logger = require('./logger');

module.exports.respond = (res, error = {}) => {
  logger.error(error);

  if (error.handledError) {
    return res.status(error.code).json({ message: error.message }).end();
  }

  return res.status(500).end();
};
