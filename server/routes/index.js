const router = require('express').Router();

const api = require('./api');
const client = require('./client');
const { authenticate, respond } = require('./middlewares');

module.exports = () => {
  api(router);
  client(router);

  router.get('/*', authenticate, respond());

  return router;
};
