const setCities = require('./setCities');

const run = async () => {
  await setCities();

  process.exit();
};

run();
