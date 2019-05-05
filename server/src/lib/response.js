/**
 * A generic http response for the application
 */
module.exports = class {
  constructor(data, status = 200) {
    this.status = status;
    this.data = data;
  }
};
