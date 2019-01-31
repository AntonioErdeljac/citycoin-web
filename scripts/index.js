const setRijeka = require('./setRijeka');
const setKastav = require('./setKastav');
const setZagreb = require('./setZagreb');

const run = async () => {
  await setRijeka();
  await setKastav();
  await setZagreb();

  process.exit();
};

run();
