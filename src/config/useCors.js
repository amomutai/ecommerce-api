const cors = require('cors');

module.exports = class Cors {
  crs;

  constructor(config) {
    this.crs = cors(config);
  }

  get cors() {
    return this.crs;
  }
};
